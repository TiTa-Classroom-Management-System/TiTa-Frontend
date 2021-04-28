const self = this;

if (!self.define) {
    const e = (e) => {
            "require" !== e && (e += ".js");
            let s = Promise.resolve();
            return (
                a[e] ||
                    (s = new Promise(async (s) => {
                        if ("document" in self) {
                            const a = document.createElement("script");
                            (a.src = e),
                                document.head.appendChild(a),
                                (a.onload = s);
                        } else importScripts(e), s();
                    })),
                s.then(() => {
                    if (!a[e])
                        throw new Error(
                            `Module ${e} didn’t register its module`
                        );
                    return a[e];
                })
            );
        },
        s = (s, a) => {
            Promise.all(s.map(e)).then((e) => a(1 === e.length ? e[0] : e));
        },
        a = { require: Promise.resolve(s) };
    self.define = (s, i, c) => {
        a[s] ||
            (a[s] = Promise.resolve().then(() => {
                let a = {};
                const r = { uri: location.origin + s.slice(1) };
                return Promise.all(
                    i.map((s) => {
                        switch (s) {
                            case "exports":
                                return a;
                            case "module":
                                return r;
                            default:
                                return e(s);
                        }
                    })
                ).then((e) => {
                    const s = c(...e);
                    return a.default || (a.default = s), a;
                });
            }));
    };
}
define("./sw.js", ["./workbox-86d6cfa2"], function (e) {
    "use strict";
    self.addEventListener("message", (e) => {
        e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
    }),
        e.precacheAndRoute(
            [
                {
                    url: "favicon.ico",
                    revision: "c92b85a5b907c70211f4ec25e29a8c4a",
                },
                {
                    url: "icons/apple-icon-180.png",
                    revision: "c049d0ca77259caf746f426a589949f8",
                },
                {
                    url: "icons/apple-splash-1125-2436.jpg",
                    revision: "ece85cd9ec0f4fe48a66c9214e1b633a",
                },
                {
                    url: "icons/apple-splash-1136-640.jpg",
                    revision: "2e549a00377098a6dcfccd68674fe43d",
                },
                {
                    url: "icons/apple-splash-1170-2532.jpg",
                    revision: "03c2870f2b92a6586457b27d8132bfd0",
                },
                {
                    url: "icons/apple-splash-1242-2208.jpg",
                    revision: "401e57508f934a49bb6a9391bebe1242",
                },
                {
                    url: "icons/apple-splash-1242-2688.jpg",
                    revision: "018743bee64231aa4ad54434f6fcb931",
                },
                {
                    url: "icons/apple-splash-1284-2778.jpg",
                    revision: "d4e9e95085f419a900536f674edf4952",
                },
                {
                    url: "icons/apple-splash-1334-750.jpg",
                    revision: "398376ddae666ca8f3e878ab31211b6e",
                },
                {
                    url: "icons/apple-splash-1536-2048.jpg",
                    revision: "ab4bcab1b3ba3845bedc619e1f89e7a0",
                },
                {
                    url: "icons/apple-splash-1620-2160.jpg",
                    revision: "5d5f2439d1cd39c455e1933caf63ee1d",
                },
                {
                    url: "icons/apple-splash-1668-2224.jpg",
                    revision: "bfb72bac02f4f3c57328d8512671dac6",
                },
                {
                    url: "icons/apple-splash-1668-2388.jpg",
                    revision: "3d38600b321911a7a7dd1f5ee55ea599",
                },
                {
                    url: "icons/apple-splash-1792-828.jpg",
                    revision: "d28f07bb6207917f9695895f26364adb",
                },
                {
                    url: "icons/apple-splash-2048-1536.jpg",
                    revision: "e6975c14cd5bbf047062c26d166b77c7",
                },
                {
                    url: "icons/apple-splash-2048-2732.jpg",
                    revision: "0ca316b3644cf4029a058a6c3ce95246",
                },
                {
                    url: "icons/apple-splash-2160-1620.jpg",
                    revision: "90de300533969de8a8f8c278be606724",
                },
                {
                    url: "icons/apple-splash-2208-1242.jpg",
                    revision: "4bbe70abc6f5d7593795f03065cc5c68",
                },
                {
                    url: "icons/apple-splash-2224-1668.jpg",
                    revision: "080895fca164ce3d7fbf5b655e3b7f41",
                },
                {
                    url: "icons/apple-splash-2388-1668.jpg",
                    revision: "4bbcb508c11b7d0c5e900c6569727154",
                },
                {
                    url: "icons/apple-splash-2436-1125.jpg",
                    revision: "87edfd9050cb04707cc201d1245346d5",
                },
                {
                    url: "icons/apple-splash-2532-1170.jpg",
                    revision: "3b455125649b5fe011719bcd32277270",
                },
                {
                    url: "icons/apple-splash-2688-1242.jpg",
                    revision: "de9a42b83a409fe6c3220e94c7d9da09",
                },
                {
                    url: "icons/apple-splash-2732-2048.jpg",
                    revision: "7bb3d73642f53b98a0eabfe02127ad9b",
                },
                {
                    url: "icons/apple-splash-2778-1284.jpg",
                    revision: "7b4d7e21d624dd92af880814cf38874c",
                },
                {
                    url: "icons/apple-splash-640-1136.jpg",
                    revision: "2c1590dad18088f9c00c52a540ad2a22",
                },
                {
                    url: "icons/apple-splash-750-1334.jpg",
                    revision: "e79dece71750a7104750247ffad6acd1",
                },
                {
                    url: "icons/apple-splash-828-1792.jpg",
                    revision: "957872b4c8c7202dca4e228801bc97b7",
                },
                {
                    url: "icons/manifest-icon-192.png",
                    revision: "171e38256446bc38039ef217acaea900",
                },
                {
                    url: "icons/manifest-icon-512.png",
                    revision: "06de61548b09403d11525abb62110717",
                },
                {
                    url: "index.html",
                    revision: "5c99bdd4ec4bfe451a09fa9ac58c1429",
                },
                {
                    url: "logo.png",
                    revision: "4cb68493a89aa5d6dca043cb16145183",
                },
                {
                    url: "logo192.png",
                    revision: "33dbdd0177549353eeeb785d02c294af",
                },
                {
                    url: "logo512.png",
                    revision: "917515db74ea8d1aee6a246cfbcc0b45",
                },
                {
                    url: "manifest.json",
                    revision: "2f6810091092b296aaf48a9dff90a423",
                },
                {
                    url: "robots.txt",
                    revision: "61c27d2cd39a713f7829422c3d9edcc7",
                },
                {
                    url: "service-worker.js",
                    revision: "a8b261d7464ff874ae279ebf96d42ade",
                },
                {
                    url: "TiTa_Load.gif",
                    revision: "88e2cf0f804e8e32dabcf2f1cd527f63",
                },
            ],
            { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
        );
});
//# sourceMappingURL=sw.js.map

import { BackgroundSyncPlugin } from "workbox-background-sync";
import { registerRoute } from "workbox-routing";
import { NetworkOnly } from "workbox-strategies";

const bgSyncPlugin = new BackgroundSyncPlugin("myQueueName", {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    /\/api\/.*\/*.json/,
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    "POST"
);
