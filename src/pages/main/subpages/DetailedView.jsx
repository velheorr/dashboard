import React, {useEffect} from 'react';
import {
    Button, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Tooltip,
    Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../layout.scss'
import {useNavigate} from "react-router";
import Chart from "../../../elements/Chart";

import {useSelector} from "react-redux";
import BlockShadow from "../../../elements/BlockShadow";
import {palette} from "../../../utils/theme";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {useModal} from "../../../hook/useModal";



const DetailedView = () => {
    const navigate = useNavigate();
    const currentItem = useSelector(state => state.mainData.currentItem);
    const mode = useSelector(state => state.header.mode);

    useEffect(()=>{
        if (Object.keys(currentItem).length === 0) {
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

    const {setModal} = useModal()

    return (
        <div className='main'>
            <div className='topTitle'>
                <div><Button onClick={() => navigate('/')} variant="contained" sx={{background: palette.green}} color='success' size='small' startIcon={<ArrowBackIcon />}>Назад</Button></div>
                <Typography sx={{pr: 1, color: mode === "dark" ? palette.white : palette.black, fontWeight: 600}}
                            noWrap
                            align='right'
                            variant="subtitle1"
                            gutterBottom>
                    {currentItem.Холдинг} {currentItem.Холдинг ? '/' : null} {currentItem.Контрагент}
                </Typography>
            </div>

            <BlockShadow>
                <Tooltip title={<Typography variant="body2" gutterBottom>Справка к дтаграмме проекта</Typography>}>
                    <span style={{float: "right"}}><IconButton onClick={()=> {setModal('projectDiagram')}} size="small" sx={{color: mode === "dark" ? palette.white : palette.grey}}><HelpOutlineIcon /></IconButton></span>
                </Tooltip>
                    <Typography sx={{mt: 2, pl: 1, pr: 1, color: mode === "dark" ? palette.white : palette.black, fontWeight: 600}}
                            noWrap
                            align='center'
                            variant="h6"
                            gutterBottom>
                    {currentItem.НаименованиеОбъекта}
                </Typography>
                {currentItem? <Chart item={currentItem} variant='detailed'/> : <div>no data</div>}
            </BlockShadow>
            <BlockShadow>
                <Tooltip title={<Typography variant="body2" gutterBottom>Справка к параметрам проекта</Typography>}>
                    <span style={{float: "right"}}><IconButton onClick={()=> {setModal('projectParams')}} size="small" sx={{color: mode === "dark" ? palette.white : palette.grey}}><HelpOutlineIcon /></IconButton></span>
                </Tooltip>
                <Typography sx={{mt: 2, pl: 1, pr: 1, color: mode === "dark" ? palette.white : palette.black, fontWeight: 600}}
                            noWrap
                            align='center'
                            variant="h6"
                            gutterBottom>
                    Параметры проекта (факт / план)
                </Typography>
                {currentItem?
                    <List>
                        <CustomItem name="Коэффициент сложности Объекта:"
                                    value={`${currentItem.КоэфСложностиФакт} / ${currentItem.КоэфСложностиПлан}`}
                                    tooltip1={`ПЛАН - это коэффициент усложнения Объекта, предусмотренный Техническим решением.`}
                                    tooltip2={`ФАКТ - это коэффициент усложнения Объекта по факту выполнения работ.`}
                        />

                        <CustomItem name="Коэффициент эффективности:"
                                    value={`${currentItem.КоэфЭффективностиФакт} / ${currentItem.КоэфЭффективностиПлан}`}
                                    ifColor={formatColor(currentItem.КоэфЭффективностиФакт, currentItem.КоэфЭффективностиПлан, 'effectivness')}
                                    tooltip1={`ПЛАН - это базовое значение коэффициента эффективности.`}
                                    tooltip2={`ФАКТ - это коэффициент эффективности организации работ на текущий момент.`}
                        />
                        <CustomItem name="Количество персонала на объекте:"
                                    value={`${currentItem.КоличествоПерсоналаФакт} / ${currentItem.КоличествоПерсоналаПлан}`}
                                    ifColor={formatColor(currentItem.КоличествоПерсоналаФакт, currentItem.КоличествоПерсоналаПлан, 'personal')}
                                    tooltip1={`ПЛАН - это планируемое количество рабочего персонала (кроме ИТР).`}
                                    tooltip2={`ФАКТ - это фактическое количество рабочего персонала (кроме ИТР) на текущий момент.`}
                        />
                        <CustomItem name="Количество ИТР на объекте:"
                                    value={`${currentItem.КоличествоИТРФакт} / ${currentItem.КоличествоИТРПлан}`}
                                    ifColor={formatColor(currentItem.КоличествоИТРФакт, currentItem.КоличествоИТРПлан, 'itr')}
                                    tooltip1={`ПЛАН - это планируемое количество ИТР.`}
                                    tooltip2={`ФАКТ - это фактическое количество ИТР на текущий момент.`}
                        />
                        <CustomItem name="Запроцентовано, руб:"
                                    value={`${formatAmount(currentItem.ЗапроцентованоФакт)} / ${formatAmount(currentItem.СуммаКонтракта)}`}
                                    ifColor={formatColor(currentItem.ЗапроцентованоФакт, currentItem.СуммаКонтракта, 'zaprocentovano')}
                                    tooltip1={`ПЛАН - сумма Договора.`}
                                    tooltip2={`ФАКТ - фактически запроцентованная сумма по Объекту.`}
                        />
                    </List>
                    : <div>no data</div>
                }
            </BlockShadow>
        </div>
    )
};

export default DetailedView;

const CustomItem = ({name, value, ifColor, tooltip1, tooltip2})=> {
    const mode = useSelector(state => state.header.mode);
    return <ListItem disablePadding divider sx={{borderBottom: mode === 'dark' ? '1px solid rgb(255 255 255 / 41%)': ''}}>
        <ListItemButton>
            <ListItemText primary={name} />
            <Tooltip title={
                <>
                    <Typography variant="body2" gutterBottom>{tooltip1}</Typography>
                    <Typography variant="body2" gutterBottom>{tooltip2}</Typography>
                </>
            } >
                <ListItemText sx={{textAlign: 'end', color: palette[ifColor]}} primary={value} />
            </Tooltip>
        </ListItemButton>
    </ListItem>
}