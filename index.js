const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');;
const port = 3000;

const fs = require('fs');

const readline = require('readline');

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.all('*', (req, res) => {
    console.log('parameters:', req.headers, req.params, "body: ", req.body);
    console.log(req.path)
    if (req.path.match("registerGJ")) {
        console.log("yes")
        const stream = fs.createWriteStream('./acc/account_usernames.txt', {
            flags: 'a'
        });
        stream.write(req.body.userName + '\n');
        stream.end();
        const stream2 = fs.createWriteStream('./acc/account_gjp2s.txt', {
            flags: 'a'
        });
        stream2.write(gengjp2(req.body.password) + '\n');
        stream2.end();
        res.send("1")
    } else if (req.path.match("loginGJ")) {
        checkLogin(req.body.userName, req, res)
        console.log(req.body.gjp2, "gjp2r")
    } else if (req.path.match("getGJUsers20")) {
        res.send("1:pkldm:2:241031693:13:0:17:0:6:0:9:1:10:0:11:3:14:0:15:0:16:28067730:3:0:52:0:8:0:4:0#999:0:10")
        console.log("users")
    } else if (req.path.match("getGJUserInfo20")) {
        res.send("1:pkldm:2:241031693:13:0:17:0:10:1:11:2:51:0:3:0:52:0:46:0:4:0:8:0:18:1:19:0:50:0:20::21:1:22:1:23:1:24:1:25:1:26:1:28:0:43:1:48:1:53:1:54:1:30:0:16:28067730:31:0:44::45::49:0:38:0:39:0:40:0:29:1")
        console.log("userinfo")
    } else if (req.path.match("getGJLevels21")) {
        let fullData = ""
        let fullData2 = ""


        const fileStream = fs.createReadStream('./lvls/lvl_names.txt');

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let lineNumber = 0; 

        rl.on('line', (line) => {
            lineNumber++;
            console.log(`Line from file: ${line}`,lineNumber);
            try {
              const data = fs.readFileSync('./lvls/lvl_data.txt', 'utf8');
              const lines = data.split('\n');

              const data2 = fs.readFileSync('./lvls/lvl_uploaderid.txt', 'utf8');
              const lines2 = data2.split('\n');

              const data3 = fs.readFileSync('./lvls/lvl_uploader.txt', 'utf8');
              const lines3 = data3.split('\n');
              
              const firstLine = lines[lineNumber-1];
              const firstLine2 = lines2[lineNumber-1];
              const firstLine3 = lines3[lineNumber-1];

              fullData2 = fullData2 + firstLine2+":"+firstLine3+":"+firstLine2+"|"
              
              console.log('line:', firstLine);
              fullData = fullData + "1:"+lineNumber+":2:"+line+":5:1:"+"6:"+firstLine2+":8:10:9:"+"5"+":10:"+"1000"+":12:"+"5"+":13:22:14:"+"1000"+":17:0:43:0:25:0:18:"+"5"+":19:0:42:0:45:65535:3:"+"base64"+":15:"+"3"+":30:"+"0"+":31:"+"0"+":37:"+"3"+":38:"+"3"+":39:"+"3"+":46:1:47:2:40:"+"0"+":35:"+"987782"+"|"
              console.log("1:"+lineNumber+":2:"+line+":5:1:"+"6:"+firstLine2+":8:10:9:"+"5"+":10:"+"1000"+":12:"+"5"+":13:22:14:"+"1000"+":17:0:43:0:25:0:18:"+"5"+":19:0:42:0:45:65535:3:"+"base64"+":15:"+"3"+":30:"+"0"+":31:"+"0"+":37:"+"3"+":38:"+"3"+":39:"+"3"+":46:1:47:2:40:"+"0"+":35:"+"987782"+"|")
            } catch (err) {
              console.error('Error reading the file:', err);
            }
        });

        rl.on('close', () => {
            console.log('End of file');
            fullData = fullData.slice(0, -1) + "#" + fullData2
            console.log(fullData)
            res.send(fullData + genlvlhash("id" [0] + "id" [("id".length) - 1] + "stars" + "coins"))
        });
//1:10565740:2:Bloodbath:5:3:6:503085:8:10:9:50:10:44138442:12:0:13:21:14:2375318:17:1:43:6:25::18:10:19:10330:42:0:45:24746:3:V2hvc2UgYmxvb2Qgd2lsbCBiZSBzcGlsdCBpbiB0aGUgQmxvb2RiYXRoPyBXaG8gd2lsbCB0aGUgdmljdG9ycyBiZT8gSG93IG1hbnkgd2lsbCBzdXJ2aXZlPyBHb29kIGx1Y2suLi4=:15:3:30:7679228:31:0:37:0:38:0:39:0:46:1:47:2:35:467339|1:21761387:2:Bloodbath Z:5:1:6:3277407:8:10:9:20:10:4556435:12:0:13:20:14:200369:17:1:43:4:25::18:10:19:17840:42:0:45:0:3:UmVtYWtlIG9mIEJCLCBidXQgU2hvcnRlciBhbmQgbXVjaCBlYXNpZXIgWEQgTW9yZSBvZiBhIGdhbWVwbGF5IGxldmVsISAgSnVzdCBhIGZ1biBlYXN5IGRlbW9uLiBWZXJpZmllZCBCeSBYaW9kYXplciEgRW5qb3kgOkQ=:15:3:30:0:31:0:37:3:38:1:39:10:46:1:47:2:35:223469|1:64968478:2:Bloodbath but no:5:1:6:19747356:8:10:9:50:10:652130:12:0:13:21:14:51559:17::43:6:25::18:8:19:24992:42:0:45:23233:3:Qmxvb2RiYXRoLCBJdCdzIG5vdCBldmVuIHRoaXM=:15:3:30:0:31:0:37:0:38:1:39:8:46:1:47:2:35:706340|1:75795864:2:Bloodbath:5:2:6:12348083:8:10:9:40:10:88763:12:0:13:21:14:4326:17::43:5:25::18:7:19:25025:42:0:45:55947:3:VGhhbmtzIHRvIGV2ZXJ5b25lIGluIG15IGRpc2NvcmQgc2VydmVyIHRoYXQgY29udHJpYnV0ZWQ=:15:3:30:0:31:0:37:0:38:1:39:6:46:1:47:2:35:513064#503085:Riot:37415|3277407:Zyzyx:88354|12348083:KNOEPPEL:3009121|19747356:Texic:6152129#1~|~223469~|~2~|~ParagonX9 - HyperioxX~|~3~|~31~|~4~|~ParagonX9~|~5~|~3.77~|~6~|~~|~10~|~http%3A%2F%2Faudio.ngfiles.com%2F223000%2F223469_ParagonX9___HyperioxX.mp3~|~7~|~~|~8~|~1~:~1~|~467339~|~2~|~At the Speed of Light~|~3~|~52~|~4~|~Dimrain47~|~5~|~9.56~|~6~|~~|~10~|~http%3A%2F%2Fgeometrydashcontent.com%2Fsongs%2F467339.mp3~|~7~|~~|~8~|~1~:~1~|~513064~|~2~|~EnV - Uprise~|~3~|~149~|~4~|~Envy~|~5~|~8.71~|~6~|~~|~10~|~http%3A%2F%2Faudio.ngfiles.com%2F513000%2F513064_EnV---Uprise.mp3~|~7~|~UCaRqE7rKwJl1BvMRU4FFVJQ~|~8~|~1~:~1~|~706340~|~2~|~-At the Speed of Light- (8 bit Remix)~|~3~|~46724~|~4~|~ThaPredator~|~5~|~4.78~|~6~|~~|~10~|~http%3A%2F%2Faudio.ngfiles.com%2F706000%2F706340_-At-the-Speed-of-Light--8-.mp3~|~7~|~~|~8~|~1#4:0:10#1664b8bb919b0822a4408752c37a9fb5f651f813
        // letter 1 of id + final letter of id + stars + coins = segment of lvls hash getgjlvls
        // "1:".$level1["levelID"].":2:".$level1["levelName"].":5:".$level1["levelVersion"].":6:".$level1["userID"].":8:10:9:".$level1["starDifficulty"].":10:".$level1["downloads"].":12:".$level1["audioTrack"].":13:".$level1["gameVersion"].":14:".$level1["likes"].":17:".$level1["starDemon"].":43:".$level1["starDemonDiff"].":25:".$level1["starAuto"].":18:".$level1["starStars"].":19:".$level1["starFeatured"].":42:".$level1["starEpic"].":45:".$level1["objects"].":3:".$level1["levelDesc"].":15:".$level1["levelLength"].":30:".$level1["original"].":31:".$level1['twoPlayer'].":37:".$level1["coins"].":38:".$level1["starCoins"].":39:".$level1["requestedStars"].":46:1:47:2:40:".$level1["isLDM"].":35:".$level1["songID"]."|";
        console.log(Number("hi") === toString(NaN))
    } else if (req.path.match("downloadGJLevel22")) {
        res.send("1:100015232:2:axe:3::4:H4sIAAAAAAAAC6WTyw2DQAxEG3Ikjz98lFNqSAEuIC2k-Kx3OBKJKAf8WMb78CLxevomqNCygmV5WWYBhBF8GHVDLQVVrbVQyC5baW2FN2oq1K4p8L9iP1V0Dzdcklj1_jPRT59krP93xKmjt9tYXTpOfj1OT2J6UbN81fz4ec-OJK8HXLSRxEKEjMr7dVY7cq6wNZ6-M5uVnhk8YlamUDaxy9hm7LBV0O1KgLAJo8pocWbOzDlaUBaURTJzIgjO7XxR_2CNfQLH-JTZMSc49cAdkmJiW4pL6NDnuO4fBZ-iKqgDAAA=:5:1:6:230360531:8:0:9:0:10:5:12:0:13:22:14:0:17::43:0:25::18:0:19:0:42:0:45:1:15:0:30:0:31:0:28:4 weeks:29:4 weeks:35:0:36::37:0:38:0:39:0:46:7:47:0:40:0:57:680:27:Aw==#3d5aa012e74823ea372422a067916634e9c9666b#d161f6b9e43171d0293c6635233c48e97bbb8202")
        console.log("userinfo")
    } else if (req.path.match("getGJSongInfo")) {
        (async () => {
            let params = new URLSearchParams()
            params.append("songID", req.body.songID)
            params.append("secret", "Wmfd2893gb7")
            console.log(params)
            let resd = await fetch("http://www.boomlings.com/database/getGJSongInfo.php", {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "user-agent": ""
                },
                body: params,
                method: "POST"
            }).then(resd => {
                return resd.text()
            })
            console.log(resd)
            res.send(resd)
        })()
    } else if (req.path.match("uploadGJLevel21")) {
        const stream = fs.createWriteStream('./lvls/lvl_data.txt', {
            flags: 'a'
        });
        stream.write(req.body.levelString + '\n');
        stream.end();
        const stream2 = fs.createWriteStream('./lvls/lvl_uploader.txt', {
            flags: 'a'
        });
        stream2.write(req.body.userName + '\n');
        stream2.end();
        const stream3 = fs.createWriteStream('./lvls/lvl_uploaderid.txt', {
            flags: 'a'
        });
        stream3.write(req.body.accountID + '\n');
        stream3.end();
        const stream4 = fs.createWriteStream('./lvls/lvl_names.txt', {
            flags: 'a'
        });
        stream4.write(req.body.levelName + '\n');
        stream4.end();
        res.send(200, 6988888)
    } else {
        res.send("-1")
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


function checkLogin(user, req, res) {
    const filePath = './acc/account_usernames.txt';
    const searchText = user;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        var index = data.indexOf(searchText);
        var tempString = data.substring(0, index);
        var lineNumber = tempString.split('\n').length;
        fs.readFile("./acc/account_gjp2s.txt", 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            const lines = data.split('\n');
            const da = lines[lineNumber - 1];
            console.log(da, "found")
            if (da === req.body.gjp2) {
                console.log(lineNumber + "," + lineNumber)
                res.send(lineNumber + "," + lineNumber)
            } else {
                res.send("-1")
            }
        });
    });

}


const crypto = require('crypto');
const req = require('express/lib/request');
const {
    stringify
} = require('querystring');

function gengjp2(pass) {
    const shasum = crypto.createHash('sha1');
    shasum.update(pass + "mI29fmAnxgTs");
    return shasum.digest('hex')
}

function genlvlhash(d) {
    const shasum = crypto.createHash('sha1');
    shasum.update(d + "xI25fpAapCQg");
    return shasum.digest('hex')
}


// letter 1 of id + final letter of id + stars + coins = segment of lvls hash getgjlvls
// "1:".$level1["levelID"].":2:".$level1["levelName"].":5:".$level1["levelVersion"].":6:".$level1["userID"].":8:10:9:".$level1["starDifficulty"].":10:".$level1["downloads"].":12:".$level1["audioTrack"].":13:".$level1["gameVersion"].":14:".$level1["likes"].":17:".$level1["starDemon"].":43:".$level1["starDemonDiff"].":25:".$level1["starAuto"].":18:".$level1["starStars"].":19:".$level1["starFeatured"].":42:".$level1["starEpic"].":45:".$level1["objects"].":3:".$level1["levelDesc"].":15:".$level1["levelLength"].":30:".$level1["original"].":31:".$level1['twoPlayer'].":37:".$level1["coins"].":38:".$level1["starCoins"].":39:".$level1["requestedStars"].":46:1:47:2:40:".$level1["isLDM"].":35:".$level1["songID"]."|";
