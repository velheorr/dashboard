import * as React from 'react';
import './modal.scss'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import {closeModal, openModal} from "./ModalSlice";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import {palette} from "../../utils/theme";


export default function TransitionsModal() {
    const dispatch = useDispatch();
    const handleOpen = () => dispatch(openModal());
    const handleClose = () => dispatch(closeModal());

    const open = useSelector(state => state.modal.open);
    const variant = useSelector(state => state.modal.variant);
    const mode = useSelector(state => state.header.mode);

    const modal_bg = mode === "dark" ?  palette.grey[500] : 'background.paper'
    const modal_color = mode === "dark" ?  palette.grey[500] : palette.black
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
       /* bgcolor: 'background.paper',*/
        bgcolor:  modal_bg,
        color: modal_color,
        border: '1px solid rgba(0,0,0,.2)',
        boxShadow: 24,
        p: 4,
    };

    let modalData = ''
    switch (variant){
        case 'mainPage':
            modalData =  <>
                <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>Добро пожаловать на GUARDIAN DASHBOARD!</Typography>
                <Typography variant="body2" gutterBottom>Это Панель Управления, на которой вы можете видеть блоки Объектов с групповыми гистограммами.
                    Каждый блок имеет рамку, которая окрашивается в один из цветов светофора в зависимости от состояния текущих показателей по Объекту.</Typography>
                <Typography variant="body2" gutterBottom>В верхней левой части Панели Управления находятся фильтры по Холдингу и Заказчику.
                    При выборе Заказчика Холдинг устанавливается автоматически. Если фильтры не выбраны, то на Панели Управления отображаются все доступные Объекты.</Typography>
                <Typography variant="body2" gutterBottom>При клике на любое место блока Объекта откроется детализация текущего состояния Объекта.</Typography>
                <Typography variant="body2" gutterBottom>При клике на кнопку "Назад" произойдёт возврат на страницу со всеми Объектами.</Typography>
            </>
            break;
        case 'projectDiagram':
            modalData = <>
                <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>Диаграмма Проекта</Typography>
                <Typography variant="body2" gutterBottom>В диаграмме Проекта содержится 5 ключевых показателей. Все показатели отображаются в процентах.</Typography>
                <Typography variant="body2" gutterBottom>1. Объем работ - это трудоёмкость выполненных работ по отношению к общей трудоемкостью работ по Объекту. Например,
                    выполнено 50 нормочасов трудоёмкости из 100 нормочасов. Тогда показатель "Объем работ" будет равен 50 %.</Typography>
                <Typography variant="body2" gutterBottom>2. Сроки контракта - это количество прошедших дней по Договору по отношению к общему количеству дней по Договору.
                    Например, прошло 25 дней из 100 дней. Тогда показатель "Сроки контракта" будет равен 25 %.</Typography>
                <Typography variant="body2" gutterBottom>3. Наличие материалов - это стоимость поступивших на Объект материалов по отношению к общей стоимости материалов.
                    Например, поступило материалов на сумму 300 000 руб. из 1 000 000 руб. Тогда показатель "Наличие материалов" будет равен 30 %.</Typography>
                <Typography variant="body2" gutterBottom>4. Процентование предъявлено - это сумма выписанных Реализаций по Объекту по отношению к общей сумме Договора.
                    Например, выписано Реализаций на сумму 750 000 руб. из 1 000 000 руб. Тогда показатель "Процентование предъявлено" будет равен 75 %.</Typography>
                <Typography variant="body2" gutterBottom>5. Процентование принято - это сумма подписанных Заказчиком Реализаций по Объекту по отношению к общей сумме Договора.
                    Например, принято Реализаций на сумму 800 000 руб. из 1 000 000 руб. Тогда показатель "Процентование принято" будет равен 80 %.</Typography>
            </>
            break;
        case 'projectParams':
            modalData = <>
                <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>Параметры Проекта</Typography>
                <Typography variant="body2" gutterBottom>Параметры проекта - это перечень показателей Реализации Проекта, отображаемых в формате "факт / план" в натуральных единицах измерения.</Typography>
                <Typography variant="body2" gutterBottom>1. Коэффициент сложности Объекта:</Typography>
                <Typography variant="body2" gutterBottom>ПЛАН - это суммарный коэффициент усложнения Объекта, который применён к базовым расценкам при разработке Калькуляции (Технического Решения) инженером.</Typography>
                <Typography variant="body2" gutterBottom>ФАКТ - это суммарный коэффициент усложнения Объекта по факту выполнения работ, который подтвержден руководителем строительства.
                    Если расхождений между ПЛАНом и ФАКТом нет, то коэффициент сложности объекта подтвердился в ходе Реализации Проекта.
                </Typography>
                <Typography variant="body2" gutterBottom>2. Коэффициент эффективности - это показатель, накопительным итогом отображающий эффективность производства работ на Объекте.
                    Он вычисляется путём деления выполненного объема работ (в нормочасах, с учётом коэффициентов усложнения) на количество отработанного времени по табелю (в человеко-часах) за вычетом дополнительных работ (в нормочасах).
                </Typography>
                <Typography variant="body2" gutterBottom>ПЛАН - это базовое значение коэффициента эффективности, равное 1,00.</Typography>
                <Typography variant="body2" gutterBottom>ФАКТ - это коэффициент эффективности организации работ на Объекте на текущий момент.</Typography>
                <Typography variant="body2" gutterBottom>3. Количество персонала на объекте:</Typography>
                <Typography variant="body2" gutterBottom>ПЛАН - это планируемое количество рабочего персонала (кроме ИТР) для производства работ на Объекте.</Typography>
                <Typography variant="body2" gutterBottom>ФАКТ - это фактическое количество рабочего персонала (кроме ИТР) на Объекте на текущий момент.</Typography>
                <Typography variant="body2" gutterBottom>4. Количество ИТР на объекте:</Typography>
                <Typography variant="body2" gutterBottom>ПЛАН - это планируемое количество ИТР для производства работ на Объекте.</Typography>
                <Typography variant="body2" gutterBottom>ФАКТ - это фактическое количество ИТР на Объекте на текущий момент.</Typography>
                <Typography variant="body2" gutterBottom>5. Запроцентовано, руб.:</Typography>
                <Typography variant="body2" gutterBottom>ПЛАН - сумма Договора.</Typography>
                <Typography variant="body2" gutterBottom>ФАКТ - фактически запроцентованная сумма по Объекту.</Typography>
            </>
            break;
    }

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                disableAutoFocus={true}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                        <Box sx={style}>
                            <div className='modalBtn'>
                                <IconButton onClick={handleClose} size="large" sx={{color: palette.white}}><CloseIcon fontSize='inherit'/></IconButton>
                            </div>
                            <div style={{color: mode === "dark" ?  palette.white : palette.black}}>
                                {modalData}
                            </div>

                        </Box>
                </Fade>
            </Modal>
        </div>
    );
}
