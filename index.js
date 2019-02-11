var today = new Date(), dd = today.getDate(), mm = today.getMonth() + 1, yyyy = today.getFullYear(), monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
if (dd < 10) dd = '0' + dd
if (mm < 10) mm = '0' + mm
today = yyyy + "-" + mm + "-" + dd

function acrossMonth(resp) {
  var tm = parseInt(today.substring(5, 7))
  var td = parseInt(today.substring(8, 10))

  if (tm == 1) tm == 12

  var ln = parseInt(resp[0].substring(8, 10))
  var tn = td + monthDays[tm]

  if (tn - 7 > ln) document.getElementById("names").innerHTML += resp[1] + "<br/>"
}

window.addEventListener("load", () => {
  fetch("https://api.wynncraft.com/public_api.php?action=guildStats&command=Springshine").then((resp) => resp.json()).then((resp) => resp.members).then((members) => {
    for (var i = 0; i < members.length; i++) {
      name = members[i].name
      lastJoin = null

      fetch("https://api.wynncraft.com/public_api.php?action=playerStats&command=" + members[i].name).then((resp) => resp.json()).then((resp) => [resp.last_join.substring(0, 10), resp.username]).then((resp) => {
        if (resp[0] != today) {
          if (resp[0].substring(8, 10) < today.substring(8, 10) - 7) document.getElementById("names").innerHTML += resp[1] + "<br/>" // Seven+ days ago in-month
          else if (resp[0].substring(5, 7) < today.substring(5, 7) - 1) document.getElementById("names").innerHTML += resp[1] + "<br/>" // Two+ months ago in-year
          else if ((today.substring(5, 7) + 11 > resp[0].substring(5, 7)) && (today.substring(0, 4) > resp[0].substring(0, 4))) document.getElementById("names").innerHTML += resp[1] + "<br/>" // Two+ months ago across years
          else if (resp[0].substring(8, 10) > today.substring(8, 10)) acrossMonth(resp) // Seven+ days ago across months
        }
      })
    }
  })
})
