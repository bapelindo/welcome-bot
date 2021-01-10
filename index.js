const Discord = require(`discord.js`);
const Canvas = require(`canvas`);
const fs = require(`fs`);

const config = JSON.parse(fs.readFileSync(`config.json`, `utf8`));

const { registerFont } = require(`canvas`);
registerFont(`league.otf`, { family: `League Spartan Bold` });


//discord login...

const client = new Discord.Client();
client.once(`ready`, () => {

  console.log(`${client.user.tag} is Ready!`);
  client.user.setActivity(`Dunia Tipu Tipu`, { type: 'WATCHING' });
});

//var myGif = GIF();
//myGif.load("wallpaper.gif");

//canvas build generator


//member join

client.on(`guildMemberAdd`, async member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === config.welchannel);
  if (!channel) return;

  const canvas = Canvas.createCanvas();
  canvas.width = 1350;
  canvas.height = 650;
  const ctx = canvas.getContext(`2d`);

  // for background
  const background = await Canvas.loadImage(`./na2.png`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(0, 0);
  ctx.strokeStyle = `#74037b`;
  ctx.strokeRect(0, 0, canvas.width - 1, canvas.height - 1);
  ctx.restore();

  ctx.save();
  ctx.translate(382, 315);
  ctx.font = `48px League Spartan Bold`;
  ctx.textAlign = `center`;
  ctx.fillStyle = `#ffe479`;
  ctx.fillText(`${member.user.username}`, 0, 0);
  ctx.restore();

  ctx.save();
  ctx.translate(382, 380);
  ctx.font = `48px League Spartan Bold`;
  ctx.textAlign = `center`;
  ctx.fillStyle = `#ffe479`;
  ctx.fillText(`#${member.user.discriminator}`, 0, 0);
  ctx.restore();

  ctx.save();
  ctx.translate(28, 355);
  ctx.font = "28px League Spartan Bold";
  ctx.fillStyle = `#ff5757`;
  ctx.rotate(90 * Math.PI / 180);
  ctx.fillText(`${member.guild.memberCount}`, 0, 0);
  ctx.restore();

  ctx.save();
  ctx.translate(15, 30);
  ctx.font = `22px League Spartan Bold`;
  ctx.fillStyle = `#ffffff`;
  ctx.fillText(`Join : ${member.joinedAt.toLocaleString(`id-ID`, { timeZone: `Asia/Jakarta` })}`, 0, 0);
  ctx.restore();

  // for displayAvatarURL
  ctx.save();
  ctx.translate(0, 0);
  ctx.beginPath();
  ctx.arc(916.5, 473, 220, 0, Math.PI * 2, true);
  //ctx.stroke();
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: `png` }));
  ctx.drawImage(avatar, 695, 253, 441, 441);
  ctx.restore();

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `welcome-image.png`);

  channel.send(attachment);
});

client.on(`message`, message => {
  if (message.content === `!join`) {
    client.emit(`guildMemberAdd`, message.member);
 }
});

client.login(config.token);