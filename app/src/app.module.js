angular
    .module('angularStubApp', [
        'ngSanitize',
        'ngMaterial',
        'ngMessages',
        'material.wizard',
        'ui.router',
        'rt.encodeuri',
        'ngResource',
        'pdf',
        'swfobject',
        'isteven-multi-select',
        'angularStubApp.init',
        //'angularStubApp.projects',
        'angularStubApp.translations.init',
        'angularStubApp.header',
        'angularStubApp.dashboard',
        //'angularStubApp.files',
        'angularStubApp.documents',
        'angularStubApp.administration',
        //'angularStubApp.groups',
        'angularStubApp.users',
        'angularStubApp.systemsettings',
        'angularStubApp.search',
        'angularStubApp.common.directives',
        'angularStubApp.common.directives.filter',
        'm43nu.auto-height',
        'dcbImgFallback',
        /*DO NOT REMOVE MODULES PLACEHOLDER!!!*/ //openDesk-modules
        /*LAST*/ 'angularStubApp.translations'])// TRANSLATIONS IS ALWAYS LAST!
    .config(config)
    .run(function ($rootScope, $state, $mdDialog, authService, sessionService, APP_CONFIG) {
        angular.element(window.document)[0].title = APP_CONFIG.appName;
        $rootScope.appName = APP_CONFIG.appName;
        $rootScope.logoSrc = APP_CONFIG.logoSrc;

        $rootScope.$on('$stateChangeStart', function (event, next, params) {
            $rootScope.toState = next;
            $rootScope.toStateParams = params;
            if (next.data.authorizedRoles.length === 0) {
                return;
            }

            if (authService.isAuthenticated() && authService.isAuthorized(next.data.authorizedRoles)) {
                //We do nothing. Attempting to transition to the actual state results in call stack exception
            } else {
                event.preventDefault();
                sessionService.retainCurrentLocation();
                $state.go('login');
            }

            // If we got any open dialogs, close them before route change
            $mdDialog.cancel();
        });
    });

function config($mdThemingProvider, $stateProvider, $urlRouterProvider, USER_ROLES, $mdIconProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue', {
            'default': '600',
            'hue-1': '400',
            'hue-2': '800',
            'hue-3': '900'
        })
        .accentPalette('amber')
        .warnPalette('deep-orange');

    $mdIconProvider.icon('md-calendar', 'app/assets/img/icons/today.svg');

    $urlRouterProvider
        .when('/admin/system-settings', '/admin/system-settings/general-configuration')
        .otherwise('/');

    $stateProvider.state('site', {
        abstract: true,
        resolve: {
            authorize: ['authService', function (authService) {
            }]
        }
    }).state('dashboard', {
        parent: 'site',
        url: '/',
        views: {
            'content@': {
                templateUrl: 'app/src/dashboard/view/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.user]
        }
    }).state('docDetails', {
        parent: 'site',
        url: '/cases/case/:caseId/doc/:storeType/:storeId/:id',
        views: {
            'content@': {
                controller: 'CaseDocumentDetailsController',
                templateUrl: 'app/src/documents/view/document.html',
                controllerAs: 'docCtrl'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.user]
        }
    }).state('login', {
        parent: 'site',
        url: '/login?error&nosso',
        views: {
            'content@': {
                templateUrl: 'app/src/authentication/view/login.html',
                controller: 'AuthController',
                controllerAs: 'vm'
            }
        },
        data: {
            authorizedRoles: []
        }
    }).state('administration', {
        parent: 'site',
        url: '/admin',
        views: {
            'content@': {
                templateUrl: 'app/src/admin/view/admin.html',
                controller: 'AdminController',
                controllerAs: 'vm'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.admin],
            selectedTab: 0
        }
    }).state('administration.users', {
        url: '/users',
        data: {
            authorizedRoles: [USER_ROLES.admin],
            selectedTab: 0
        },
        views: {
            'users': {
                templateUrl: 'app/src/users/view/users.html'
            }
        }
    }).state('administration.groups', {
        url: '/groups',
        data: {
            authorizedRoles: [USER_ROLES.admin],
            selectedTab: 1
        },
        views: {
            'groups': {
                templateUrl: 'app/src/groups/view/groups.html'
            }
        }
    }).state('administration.group', {
        url: '/group/:shortName',
        data: {
            authorizedRoles: [USER_ROLES.admin],
            searchContext: 'GROUPS',
            selectedTab: 1
        },
        views: {
            'groups': {
                templateUrl: 'app/src/groups/view/group.html'
            }
        }
    }).state('administration.systemsettings', {
        url: '/system-settings',
        data: {
            authorizedRoles: [USER_ROLES.admin],
            selectedTab: 4
        },
        views: {
            'systemsettings': {
                templateUrl: 'app/src/system_settings/menu/system_settings.html',
                controller: 'SystemSettingsController',
                controllerAs: 'vm'
            }
        }
    }).state('administration.systemsettings.general', {
        url: '/general-configuration',
        data: {
            authorizedRoles: [USER_ROLES.admin]
        },
        views: {
            'systemsetting-view': {
                templateUrl: 'app/src/system_settings/general_configuration/view/generalConfiguration.html',
                controller: 'GeneralConfigurationController',
                controllerAs: 'vm'
            }
        }
    }).state('administration.systemsettings.doctypes', {
        url: '/document-types',
        data: {
            authorizedRoles: [USER_ROLES.admin]
        },
        views: {
            'systemsetting-view': {
                templateUrl: 'app/src/system_settings/document_types/view/documentTypes.html',
                controller: 'DocumentTypesController',
                controllerAs: 'vm'
            }
        }
    }).state('search', {
        url: '/search/:searchTerm',
        views: {
            'content@': {
                templateUrl: 'app/src/search/view/search.html'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.user]
        }
    }).state('files', {
        url: '/files',
        views: {
            'content@': {
                templateUrl: 'app/src/files/view/files.html',
                controller: 'FilesController',
                controllerAs: 'filesVm'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.user]
        }
    });
}