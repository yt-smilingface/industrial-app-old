import $axios from './http'

//登录
export const getLogin = (data) => {
    return $axios.post('login', data)
}
//注册
export const getRegister = (data) => {
    return $axios.post('/register', data)

}

export const getTarget = (type, data = {}) => {
    return $axios.get('monitoring/getMenu/' + type, {
        params: data
    });
}



export const getLine = (data) => {
    return $axios.post('monitoring/getDataInfoByAreaCode', data)
}


// 重点企业
export const enterpriseDetails = (enterpriseId, data = {}) => {
    return $axios.get('dataQuery/getLeftDirectoryStatistics?bbd_qyxx_id=' + enterpriseId, data)
}


// 政府登录  宏观经济总览
export const getTotalGDP = () => {
    return $axios.get('macroEconomy/getTotalGDP')
}
export const getFixedAssetInvestmentGrowthRate = () => {
    return $axios.get('macroEconomy/getFixedAssetInvestmentGrowthRate')
}
export const getMacroEconomyMap = () => {
    return $axios.get('macroEconomy/getMacroEconomyMap')
}
export const getAreaGDP = () => {
    return $axios.get('macroEconomy/getAreaGDP')
}
export const mGetIndustryValueAddedComparison = () => {
    return $axios.get('macroEconomy/getIndustryValueAddedComparison')
}
export const getDataByJsonIdAndDbcode = () => {
    return $axios.get('macroEconomy/getDataByJsonIdAndDbcode')
}



// 政府登录  工业经济监测
export const getTargetData = () => {
    return $axios.get('iEMonitoring/getTargetData')
}
export const getIndustryValueAdded = () => {
    return $axios.get('iEMonitoring/getIndustryValueAdded')
}
export const getIndustryValueAddedComparison = () => {
    return $axios.get('iEMonitoring/getIndustryValueAddedComparison')
}

export const getIndustryInvestmentComparison = () => {
    return $axios.get('iEMonitoring/getIndustryInvestmentComparison')
}
export const getIndustryBusinessEfficiency = () => {
    return $axios.get('iEMonitoring/getIndustryBusinessEfficiency')
}
export const getIndustryCategory = () => {
    return $axios.get('iEMonitoring/getIndustryCategory')
}
export const getIndustryPPI = () => {
    return $axios.get('iEMonitoring/getIndustryPPI')
}
export const getIndustryEconomyMap = () => {
    return $axios.get('iEMonitoring/getIndustryEconomyMap')
}

// 政府登录  重点企业画像
export const enterpriseSelect = () => {
    return $axios.get('portraits/enterpriseSelect')
}
export const getQyxxBasicInfoByBbdQyxxId = (data) => {
    return $axios.get('portraits/getQyxxBasicInfoByBbdQyxxId/' + data)
}





// 企业登录接口
export const undoneList = (data) => {
    return $axios.post('fillInTheList/undoneList', data)
}

export const doneList = (data) => {
    return $axios.post('fillInTheList/doneList', data)
}

export const viewHistoryReport = (formId) => {
    return $axios.post('fillInTheList/viewHistoryReport/' + formId)
}

export const insertMsg = (data) => {
    return $axios.post('fillInTheList/insertMsg', data)
}

export const listCategory = () => {
    return $axios.get('interaction/listCategory')
}

export const listResponsibilityOffice = () => {
    return $axios.get('interaction/listResponsibilityOffice')
}

export const interactive = (data) => {
    return $axios.post('interaction/interactive', data)
}
