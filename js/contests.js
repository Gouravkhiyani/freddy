// let today = new Date();
// today.toISOString().split('T')[0];

// today.toISOString().split('T')[0].substring(0,8);


const BASE_URL = "https://kontests.net/api/v1/";
const table = document.getElementById("contest-add");

async function getContests(url,platform) {
    const res = await fetch(url);
    const data = await res.json();
    showContests(data,platform);
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay; 
}

function showContests(data,platform) {
    table.innerHTML = ``;
    data.forEach(contest => {
        const { name, url, start_time, duration, site, status } = contest;
        const tablerow = document.createElement('tr');
        tablerow.classList.add('danger');

        let date_time = start_time;
        let date=date_time.split('T')[0];
        let time=date_time.split('T')[1].substring(0,5);

        // today.toISOString().split('T')[0].substring(0,8);
        const d=secondsToHms(duration);

        const s= site===undefined?platform:site;
        // console.log(platform)

        tablerow.innerHTML = `
            <th>${name}</th>
            <th>${date}</th>
            <th>${time}</th>
            <th>${s}</th>
            <th>${d}</th>
            <th><a href=${url}>Link</a></th>
        `
        table.appendChild(tablerow);
    })
}

const btnContainer = document.querySelector(".contest-btn-container");
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const platform = e.currentTarget.dataset.id;
        const newurl = BASE_URL + platform;
        getContests(newurl,platform);
    });
});

getContests(BASE_URL + "all","all");
