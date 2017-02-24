/// <reference path="app_filtering.js" />

myApp.filter("gender", function () {
    return function (genderIn) {
        if (genderIn == 1)
            genderOut = "Male";
        else
            genderOut = "Female";

        return genderOut;
    }
});