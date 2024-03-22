import React, {useEffect} from 'react';
import {
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Tooltip,
    Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../main.scss'
import {useNavigate} from "react-router";
import Chart from "../../../elements/Chart";

import {useSelector} from "react-redux";
import BlockShadow from "../../../elements/BlockShadow";
import {palette} from "../../../utils/theme";



const DetailedView = () => {
    const navigate = useNavigate();
    const currentItem = useSelector(state => state.mainData.currentItem);
    const mode = useSelector(state => state.header.mode);

    useEffect(()=>{
        if (Object.keys(currentItem).length === 0) {
            // Объект пуст
            navigate('/')
        }
    },[currentItem])

     const formatAmount = (item) => {
        let x = Math.round(item)
        return new Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(x);
    }
    const formatColor = (fact, plan, rule = false) =>{
        let x = (fact * 100) / plan
        let color;
        let y = {
            zaprocentovano(){
                if (x > 25) { color = 'red'}
                else if(x > 15 && x <= 25 ) { color = 'yellow'}
                else if(x <= 15){ color = 'green'}
            },
            itr(){
                if (x <= 75 || x >= 125) { color = 'red'}
                else if( (x > 75 && x < 90) || (x >= 110 && x < 125)) { color = 'yellow'}
                else if(x >= 90 && x < 110){ color = 'green'}
            },
            personal(){
                if (x <= 75 || x >= 125) { color = 'red'}
                else if((x > 75 && x < 90) || (x >= 110 && x < 125)) { color = 'yellow'}
                else if(x >= 90 && x < 110){ color = 'green'}
            },
            effectivness(){
                if (fact <= .69 ) { color = 'red'}
                else if((fact > 70 && fact < .89) || fact > 1.2) { color = 'yellow'}
                else if(fact > .9 && fact < 1.2){ color = 'green'}
            },
        }
        if (rule){y[rule]()}
        return color
    }


    return (
        <div className='main'>
            <div className='topTitle'>
                <div><Button onClick={() => navigate('/')} variant="contained" sx={{background: palette.green}} color='success' size='small' startIcon={<ArrowBackIcon />}>Назад</Button></div>
                <Typography sx={{pr: 1, color: mode === "dark" ? palette.white : palette.black}}
                            noWrap
                            align='right'
                            variant="subtitle1"
                            gutterBottom>
                    {currentItem.Холдинг} / {currentItem.Контрагент}
                </Typography>
            </div>

            <BlockShadow>
                <Typography sx={{mt: 2, pl: 1, pr: 1, color: mode === "dark" ? palette.white : palette.black}}
                            noWrap
                            align='center'
                            variant="h6"
                            gutterBottom>
                    {currentItem.НаименованиеОбъекта}
                </Typography>
                {currentItem? <Chart item={currentItem}/> : <div>no data</div>}
            </BlockShadow>
            <BlockShadow>
                <Typography sx={{mt: 2, pl: 1, pr: 1, color: mode === "dark" ? palette.white : palette.black}}
                            noWrap
                            align='center'
                            variant="h6"
                            gutterBottom>
                    Параметры проекта (факт / план)
                </Typography>
                {currentItem?
                    <List>

                        <CustomItem name="Коэффициент сложности Объекта:" value={`${currentItem.КоэфСложностиФакт} / ${currentItem.КоэфСложностиПлан}`}/>

                        <CustomItem name="Коэффициент эффективности:"
                                    value={`${currentItem.КоэфЭффективностиФакт} / ${currentItem.КоэфЭффективностиПлан}`}
                                    ifColor={formatColor(currentItem.КоэфЭффективностиФакт, currentItem.КоэфЭффективностиПлан, 'effectivness')}
                        />
                        <CustomItem name="Количество персонала на объекте:"
                                    value={`${currentItem.КоличествоПерсоналаФакт} / ${currentItem.КоличествоПерсоналаПлан}`}
                                    ifColor={formatColor(currentItem.КоличествоПерсоналаФакт, currentItem.КоличествоПерсоналаПлан, 'personal')}
                        />
                        <CustomItem name="Количество ИТР на объекте:"
                                    value={`${currentItem.КоличествоИТРФакт} / ${currentItem.КоличествоИТРПлан}`}
                                    ifColor={formatColor(currentItem.КоличествоИТРФакт, currentItem.КоличествоИТРПлан, 'itr')}
                        />
                        <CustomItem name="Запроцентовано, руб:"
                                    value={`${formatAmount(currentItem.ЗапроцентованоФакт)} / ${formatAmount(currentItem.СуммаКонтракта)}`}
                                    ifColor={formatColor(currentItem.ЗапроцентованоФакт, currentItem.СуммаКонтракта, 'zaprocentovano')}
                        />
                    </List>
                    : <div>no data</div>
                }

            </BlockShadow>

        </div>
    )
};

export default DetailedView;

const CustomItem = ({name, value, ifColor})=> {
    const mode = useSelector(state => state.header.mode);
    return <ListItem disablePadding divider sx={{borderBottom: mode === 'dark' ? '1px solid rgb(255 255 255 / 41%)': ''}}>
        <ListItemButton>
            <ListItemText primary={name} />
            <Tooltip title={'sdfsdfgdfsg'} >
                <ListItemText sx={{textAlign: 'end', color: palette[ifColor]}} primary={value} />
            </Tooltip>
        </ListItemButton>
    </ListItem>
}