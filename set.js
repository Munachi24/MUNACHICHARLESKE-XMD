const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEN3WWUweGw0Z0tXdWpLQXhkOEZWbzg0TDEzS3l0cTV4ZVdOTDVkM3czTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicExXUHhSVjBSWDZ3OVIwZ3hSUW03aWliQ1BUL3VHMjFFaFhXODd5VU1UVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RythTDl5TVhwSzFZZXkyNkZlaEpvSkp5TjZYdjlGRTN4aUVoTjhreTBvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvREltM2dZNmtUQWJweGhEb0R1WUVVVDZ3WmVpOXZISmZFdG9GVlovR2dBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFCNjI0d1dUVjZKeGJLYkJCanc4dlMvc25iV3QxSEZWU0VzWEFMMkxIbE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxuV0o4N0NmUGZxMGNXQ2lnazFXMDFobzVPcXpUS29ad0lqOXBvcU8weWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU050dlBMb0F0Rncza3lKOG5CbVRBa2VJZlh6N3JjTUZPMlB4clBYcElXWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVjUyelRwRXVLaE1CN09WZ1hxT2FJeW00cVVlVGE4bGE0ZTFYS3QvWmZ6UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inc4TkM3c0dIZFN6YWVHbytyRHFGU0kxcnFwakdBYktEMzcvSlhiNHZJM1VIMkFSYjVFSGR4ZEZEQndKNm9tWXdZaUpVYkJNT1Nud2tDbFh1dzl0N2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjIsImFkdlNlY3JldEtleSI6InBqVDhYNitRRmlkQVJGb2RKVWh4b3R1T2FGNFVYRkw5aHJOUkF0UE5qRUk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyMjAwMDgwM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJENEE1Mzk5NzRDRTcxQ0NEODU1QUMxOTE0MTI1NENGQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUzMjQwNDc3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDIyMDAwODAzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg5NjMwNTQ1QzFEQkQ1MDczQzUzM0JERDVFMDkyMTk0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTMyNDA0Nzh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwMjIwMDA4MDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzFCQzE0MDNDQjFFQkQ4RTg4NzdDQTVGRDQ3QzY4RUMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MzI0MDQ4OX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyMjAwMDgwM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4RDQyODMzMDA2NDM2MEY2NEE5QkI4QTI4ODQ1ODI5MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUzMjQwNDk5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDIyMDAwODAzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjI1RTQyQkIzNzYyQjFCRUFFMUE0RDczQTlDNThBQzI1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTMyNDA1MTJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjEyM0xPVFVTIiwibWUiOnsiaWQiOiIyMzQ5MDIyMDAwODAzOjEzQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNjUwODYzNzA2Njg3MjA6MTNAbGlkIiwibmFtZSI6Ik1VTkHimaHimaXvuI4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1ByWmgvb0JFSXluZ2NRR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik13SjFldGtVRVc2TnNGdWpsMkkwbWxsZ0NBMis1SmJHaTdCS0RTQnhLM0k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlNkUUZHRXhUNTJYN0RhRVhOSGpQOTE3dGJJVXNRMzh6c0RLbDltdDNEdTNvSUpYNlBTS3dxUXd2cjAxSmt0YmZkTmxWK3dGNm9NYXZvUi9ZdXBOTkFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJNL1lzNGsxb3JKa2Q2TUxQZyt3b2FWYXFUQVN6bjZvdTJ3WTV5T3R6dTRRcTBJVDhNdUJqd3J5RzRYQ0pBd1hjVHlldHBOQmFkZHVXMlRObmNkbHNnZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkwMjIwMDA4MDM6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVE1DZFhyWkZCRnVqYkJibzVkaU5KcFpZQWdOdnVTV3hvdXdTZzBnY1N0eSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUzMjQwNDczLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJ6cyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Muna",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349022000803",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
