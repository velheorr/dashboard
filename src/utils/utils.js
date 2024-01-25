export const transformToBarChart = (obj) => {
    return obj.map(
        ({
             НаименованиеОбъекта,
             КодОбъекта,
             Холдинг,
             Контрагент,
             ОбъемРабот,
             СрокиКонтракта,
             НаличиеМатериалов,
             КоэфСложностиПлан,
             КоэфСложностиФакт,
             КоэфЭффективностиПлан,
             КоэфЭффективностиФакт,
             КоличествоПерсоналаПлан,
             КоличествоПерсоналаФакт,
             КоличествоИТРПлан,
             КоличествоИТРФакт,
             ЗапроцентованоФакт,
             СуммаКонтракта,
             ПроцентПредъявленныхРТИУ,
             ПроцентПринятыхРТИУ,
         }) => ({
            objectName: НаименованиеОбъекта,
            holding: Холдинг,
            customer: Контрагент,
            objCode: КодОбъекта,
            difficultyFactorFact: КоэфСложностиФакт,
            difficultyFactorPlan: КоэфСложностиПлан,
            efficiencyRatioFact: КоэфЭффективностиФакт,
            efficiencyRatioPlan: КоэфЭффективностиПлан,
            numberOfStaffFact: КоличествоПерсоналаФакт,
            numberOfStaffPlan: КоличествоПерсоналаПлан,
            numberOfITRFact: КоличествоИТРФакт,
            numberOfITRPlan: КоличествоИТРПлан,
            percentageFact: ЗапроцентованоФакт,
            percentagePlan: СуммаКонтракта,
            objectValues: [
                {
                    name: formatPercentageName("Объем работ, %"),
                    value: ОбъемРабот,
                },
                {
                    name: formatPercentageName("Сроки контракта, %"),
                    value: СрокиКонтракта,
                },
                {
                    name: formatPercentageName("Наличие материалов, %"),
                    value: НаличиеМатериалов,
                },
                {
                    name: formatPercentageName("Процентование предъявлено, %"),
                    value: ПроцентПредъявленныхРТИУ,
                },
                {
                    name: formatPercentageName("Процентование принято, %"),
                    value: ПроцентПринятыхРТИУ,
                },
            ],
        })
    );
};