const browser = "Chrome";
const supportedBrowsers = ["Chrome", "Firefox", "Safari", "Opera"];
if( browser === "Edge" ){
    console.log('Edge는 일부 기능이 지원되지 않습니다.');
} else if (supportedBrowsers.includes(browser)) {
    console.log('지원되는 브라우저입니다.');
} else {
    console.log('지원되지 않는 브라우저입니다.');
}