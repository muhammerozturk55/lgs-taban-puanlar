// LGS il bazlı veri yükleyici
// Kullanım:
// await lgsIlYukle("ANKARA")  -> window.lgsOkulVerileri içine Ankara okulları gelir.
window.LGS_VERI_BASE_URL = window.LGS_VERI_BASE_URL || "https://cdn.jsdelivr.net/gh/muhammerozturk55/lgs-taban-puanlar@ana/iller/";

function lgsSlugTR(s){
  return String(s || "")
    .replace(/Ç/g,"C").replace(/Ğ/g,"G").replace(/İ/g,"I").replace(/Ö/g,"O").replace(/Ş/g,"S").replace(/Ü/g,"U")
    .replace(/ç/g,"c").replace(/ğ/g,"g").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ş/g,"s").replace(/ü/g,"u")
    .toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

function lgsScriptYukle(src){
  return new Promise(function(resolve,reject){
    var eski = document.querySelector('script[data-lgs-il="1"]');
    if(eski) eski.remove();
    window.LGS_IL_VERILERI = null;
    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.lgsIl = "1";
    s.onload = function(){ resolve(window.LGS_IL_VERILERI || []); };
    s.onerror = function(){ reject(new Error("Veri dosyası yüklenemedi: " + src)); };
    document.head.appendChild(s);
  });
}

async function lgsIlYukle(il){
  var slug = lgsSlugTR(il);
  var data = await lgsScriptYukle(window.LGS_VERI_BASE_URL + slug + ".js");
  window.lgsOkulVerileri = data;
  return data;
}
