// 오늘 날짜 만들기
function getToday() {
    const date = new Date;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, 0); // 월은 0부터 시작해서 11로 끝나므로 +1 해줘야함
    const dd = String(date.getDate()).padStart(2, 0);
    const today = `${yyyy}-${mm}-${dd}`;
    return today;
}