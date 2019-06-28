require(["gitbook"], function(gitbook) {
    // plugin config
    var config;

    function createAdElement(adConfig) {
        adElement = document.createElement('ins');
        adElement.style = 'display: block';
        adElement.className = 'adsbygoogle';
        adElement.setAttribute('data-ad-client', adConfig.client);
        adElement.setAttribute('data-ad-slot', adConfig.slot);
        adConfig.format && adElement.setAttribute('data-ad-format', adConfig.format);
        // adConfig.style && adElement.setAttribute('style', adConfig.style);
        adElement.setAttribute('data-full-width-responsive', "true");

        console.log("adElement=%o", adElement);
        return adElement;
    }

    function injectAds(configs) {
        if(configs && configs.length > 0) {
            configs.forEach(function(c) {
                document.querySelector(c.location).appendChild(createAdElement(c));
                (adsbygoogle = window.adsbygoogle || []).push({});
            });

            configs.forEach(function(c) {
                console.log("after injectAds, related html=%s", document.querySelector(c.location));
                console.log(document.querySelector(c.location));
            });
        }
    }

    gitbook.events.bind("start", function(e, pluginConfig) {
        console.log("=================== google-adsense start: pluginConfig=%s", pluginConfig);
        config = pluginConfig['google-adsense'].ads;

        console.log("config=%o", config);
        // init script
        var adScript = document.createElement('script');
        // adScript.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        adScript.setAttribute('async', true);
        console.log("adScript=%o", adScript);
        document.body.appendChild(adScript);
    });

    gitbook.events.bind("page.change", function() {
        console.log("=================== google-adsense page.change");
        console.log("config=%o", config);
        if (config) {
            injectAds(config);
            console.log("injectAds done");
        }
    });
});
