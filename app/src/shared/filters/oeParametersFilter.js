angular
        .module('angularStubApp')
        .filter('oeParam', oeParametersFilterFactory);

function oeParametersFilterFactory(oeParametersService) {
    function oeParamFilter(oeParameterName) {
        return oeParametersService.getParameter(oeParameterName);
    }
    return oeParamFilter;
}