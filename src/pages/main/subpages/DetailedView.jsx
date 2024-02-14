import React, {useEffect} from 'react';
import {
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
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

    console.log(currentItem)

    const refactorObj = {
        АМГ: "Кряжевских А.В.",
        ВыработкаВРублях: 129,
        ДатаОкончанияКонтракта: "2023-12-01T00:00:00",
        ЗапроцентованоФакт: 67680612.24,
        КодОбъекта: "14083    ",
        КоличествоИТРПлан: 1,
        КоличествоИТРФакт: 1,
        КоличествоПерсоналаПлан: 16,
        КоличествоПерсоналаФакт: 5,
        Контрагент: "Метафракс Кемикалс",
        КоэфСложностиПлан: 1.02,
        КоэфСложностиФакт: 1.91,
        КоэфЭффективностиПлан: 1,
        КоэфЭффективностиФакт: 0.09,
        НаименованиеОбъекта: "2023 СМР ИТСО основной площадки",
        НаличиеМатериалов: 54,
        ОбъемРабот: 126,
        ПроцентПредъявленныхРТИУ: 96,
        ПроцентПринятыхРТИУ: 79,
        РП: "Кряжевских Александр Владимирович",
        СрокиКонтракта: 128,
        СуммаКонтракта: 70770102.55,
        Холдинг: "МЕТАФРАКС",
    }

    const buildData = (data) => {
        const dataText = {
            /*"Коэффициент сложности Объекта:": [КоэфСложностиФакт, КоэфСложностиПлан],*/
            "Коэффициент сложности Объекта:": 546465465,
            "Коэффициент эффективности:": 1,
            "Количество персонала на объекте:": 1,
            "Количество ИТР на объекте:": 1,
            "Запроцентовано, руб:": 1
        }
        return dataText[data]
    }


    const formatAmount = (item) => {
        /*return new Intl.NumberFormat("ru").format(item)*/
        return new Intl.NumberFormat("ru", {style: "currency", currency: "RUB"}).format(item);
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
                else if(x > 75 && x < 90 || x >= 110 && x < 125) { color = 'yellow'}
                else if(x >= 90 && x < 110){ color = 'green'}
            },
            personal(){
                if (x <= 75 || x >= 125) { color = 'red'}
                else if(x > 75 && x < 90 || x >= 110 && x < 125) { color = 'yellow'}
                else if(x >= 90 && x < 110){ color = 'green'}
            },
            effectivness(){
                if (fact <= .69 ) { color = 'red'}
                else if(fact > 70 && fact < .89 || fact > 1.2) { color = 'yellow'}
                else if(fact > .9 && fact < 1.2){ color = 'green'}
            },
        }
        if (rule){y[rule]()}
        return color
    }

    formatColor(.2, 1, 'zaprocentovano')

    return (
        <div className='main'>
            <Button onClick={() => navigate('/')} variant="outlined" color="success" size='small' startIcon={<ArrowBackIcon />}>Назад</Button>
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
                        <CustomItem name="Коэффициент сложности Объекта:" value={`${currentItem.КоэфСложностиФакт} | ${currentItem.КоэфСложностиПлан}`}/>
                        <CustomItem name="Коэффициент эффективности:"
                                    value={`${currentItem.КоэфЭффективностиФакт} | ${currentItem.КоэфЭффективностиПлан}`}
                                    ifColor={formatColor(currentItem.КоэфЭффективностиФакт, currentItem.КоэфЭффективностиПлан, 'effectivness')}
                        />
                        <CustomItem name="Количество персонала на объекте:"
                                    value={`${currentItem.КоличествоПерсоналаФакт} | ${currentItem.КоличествоПерсоналаПлан}`}
                                    ifColor={formatColor(currentItem.КоличествоПерсоналаФакт, currentItem.КоличествоПерсоналаПлан, 'personal')}
                        />
                        <CustomItem name="Количество ИТР на объекте:"
                                    value={`${currentItem.КоличествоИТРФакт} | ${currentItem.КоличествоИТРПлан}`}
                                    ifColor={formatColor(currentItem.КоличествоИТРФакт, currentItem.КоличествоИТРПлан, 'itr')}
                        />
                        <CustomItem name="Запроцентовано, руб:"
                                    value={`${formatAmount(currentItem.ЗапроцентованоФакт)} | ${formatAmount(currentItem.СуммаКонтракта)}`}
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

    return <ListItem disablePadding divider>
        <ListItemButton>
            <ListItemText primary={name} />
            <ListItemText sx={{textAlign: 'end', color: palette[ifColor]}} primary={value} />
        </ListItemButton>
    </ListItem>
}