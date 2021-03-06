// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    callbackURL: 'http://local2.tasklistsupero.io/#/callback',
    API_URL: 'http://localhost:3001',//'http://local.tasklistsupero.webapi.io',
    grid: {
        ROWS_PER_PAGE: 10,
        MAX_SIZE: 10
    },
    DATE_TIME_MINVALUE: "0001-01-01T00:00:00" 
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
