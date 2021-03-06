
    angular
            .module('angularStubApp.systemsettings')
            .factory('documentCategoryService', documentCategoryService);

    function documentCategoryService($http) {
        var service = {
            getDocumentCategories: getDocumentCategories,
            getDocumentCategory: getDocumentCategory,
            saveDocumentCategory: saveDocumentCategory,
            deleteDocumentCategory: deleteDocumentCategory
        };
        return service;

        function getDocumentCategories() {
            return $http.get('/api/opendesk/document/categories')
                    .then(onSuccess);
        }

        function getDocumentCategory(nodeRefId) {
            return $http.get('/api/opendesk/document/category',
                    {
                        params: {
                            nodeRefId: nodeRefId
                        }
                    }).then(onSuccess);
        }

        function saveDocumentCategory(documentCategory) {
            return $http.post('/api/opendesk/document/category', null,
                    {
                        params: {
                            nodeRefId: documentCategory.nodeRef,
                            name: documentCategory.name,
                            mlDisplayNames: documentCategory.mlDisplayNames
                        }
                    }).then(onSuccess);
        }

        function deleteDocumentCategory(nodeRefId) {
            return $http.delete('/api/opendesk/document/category',
                    {params: {
                            nodeRefId: nodeRefId
                        }
                    }).then(onSuccess);
        }

        function onSuccess(response) {
            return response.data;
        }
    }