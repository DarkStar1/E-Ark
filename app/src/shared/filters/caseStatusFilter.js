    
    angular
        .module('angularStubApp')
        .filter('caseStatus', caseStatusFilterFactory);
    
    function caseStatusFilterFactory($translate){
        function caseStatusFilter(caseStatusValue) {
            return $translate.instant('CASE.STATUS.' + caseStatusValue);
        }
        return caseStatusFilter;
    }