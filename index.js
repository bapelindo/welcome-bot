const Discord = require(`discord.js`);
const Canvas = require(`canvas`);
const fs = require(`fs`);
const config = JSON.parse(fs.readFileSync(`config.json`, `utf8`));

resizeText = (canvas , txt, maxWidth, fontSize) => {
    ctx = canvas.getContext(`2d`)
    ctx.font = `${fontSize}px League Spartan Bold`;
    var minFontSize = 10;
    var width = ctx.measureText(txt).width;
    if (width > maxWidth) {
      var newfontSize = fontSize;
      var decrement = 1;
      var newWidth;
      while (width > maxWidth) {
        newfontSize -= decrement;
        if (newfontSize < minFontSize) { 
          return { fontSize: `${minFontSize}px`}; 
        }
        ctx.font = `${newfontSize}px League Spartan Bold`;
        newWidth = ctx.measureText(txt).width;
        if(newWidth < maxWidth && decrement === 1){
          decrement = 0.1;
          newfontSize += 1;
        } else {
          width = newWidth;
        }
      }
      return { fontSize: `${newfontSize}px` };
    } else {
      return { fontSize: `${fontSize}px` };
    }
  }

const { registerFont } = require(`canvas`);
registerFont(`league.otf`, { family: `League Spartan Bold` });
const client = new Discord.Client();

client.on('ready', () => {
console.log(`${client.user.tag} is Ready!`);

client.guilds.cache.each((guild) => {

	const al = ["PLAYING", "WATCHING", "LISTENING"];
	const aln = [ `${guild.memberCount} Member`,`To ${guild.name} Server`, `Dunia Tipu Tipu`, `Kamu`]

	setInterval(() => {
  	const io = Math.floor(Math.random() * (al.length));
	const ind = Math.floor(Math.random() * (aln.length));
  	client.user.setActivity(`${aln[ind]}`, {type: `${al[io]}`});
 	}, 10000);
	});
});

client.on(`guildMemberAdd`, async member => {
  const cha = member.guild.channels.cache.get(config.welch);
  const chs = member.guild.channels.cache.get(config.welchs);

  if (!cha) return;
  if (!chs) return;

//  client.user.setUsername(`${member.user.username}`);
//  client.user.setAvatar(`${member.user.displayAvatarURL()}`);  

  const canvas = Canvas.createCanvas();
  canvas.width = 1350;
  canvas.height = 650;
  const ctx = canvas.getContext(`2d`);

  const background = await Canvas.loadImage(`./na2.png`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  ctx.save();
  ctx.translate(0, 0);
  ctx.strokeStyle = `#74037b`;
  ctx.strokeRect(0, 0, canvas.width - 1, canvas.height - 1);
  ctx.restore();

  ctx.save();
  ctx.translate(382, 315);
  ctx.font = resizeText(canvas,`${member.user.username}`,430,48);
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

  ctx.save();
  ctx.translate(0, 0);
  ctx.beginPath();
  ctx.arc(916.5, 473, 220, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: `png`, size:2048 }));
  ctx.drawImage(avatar, 695, 253, 441, 441);
  ctx.restore();

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `welcome-image.png`);
  const embed = new Discord.MessageEmbed()

	.setColor(`RANDOM`)
	.setAuthor(`${member.guild.name}`, `${member.guild.iconURL({ format : `gif`, dynamic : `true`})}`)
	.setTitle(`Welcome ${member.user.username} to ${member.guild.name} :tada:`)
	.setDescription(`Jangan lupa baca <#786978442016194617>.\nBiar lebih akrab kenalan dulu di <#786983049929424977>.\nSelamat bersenang senang <@${member.user.id}>.`)
	.setThumbnail(`${member.user.displayAvatarURL({ format: `png`, dynamic : `true`})}`)
	.setTimestamp()

  cha.send(attachment);
  chs.send(embed);

  client.user.setActivity('Welcome ${member.guild.name}', { type: 'WATCHING' });

});

client.on('guildMemberRemove', async member => {
//    const channel = member.guild.channels.cache.find(ch => ch.name === config.welchannel);
  const cha = member.guild.channels.cache.get(config.welch);
    if (!cha) return;

//  client.user.setUsername(`${member.user.username}`);
//  client.user.setAvatar(`${member.user.displayAvatarURL()}`);

  const canvas = Canvas.createCanvas();
  canvas.width = 1350;
  canvas.height = 650;
  const ctx = canvas.getContext(`2d`);

  // for background
  const background = await Canvas.loadImage(`./nag.png`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(0, 0);
  ctx.strokeStyle = `#ffe479`;
  ctx.strokeRect(0, 0, canvas.width - 1, canvas.height - 1);
  ctx.restore();

  ctx.save();
  ctx.translate(675, 580);
  ctx.font = resizeText(canvas, `${member.user.username}#${member.user.discriminator}`, 725, 48);
  ctx.textAlign = `center`;
  ctx.fillStyle = `#ffe45d`;
  ctx.fillText(`${member.user.username}#${member.user.discriminator}`, 0, 0);
  ctx.restore();
  
  ctx.save();
  ctx.translate(0, 0);
  ctx.beginPath();
  ctx.arc(675, 210, 161, 0, Math.PI * 2, true);
//  ctx.stroke();
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: `png`, size: 1024 }));
  ctx.drawImage(avatar, 514, 49, 322, 322);
  ctx.restore();

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `goodbye-image.png`);

  cha.send(attachment);

  client.user.setActivity(`Goodbye ${member.user.username}`, { type: 'WATCHING' })
  .catch(console.error);

});


client.on(`message`, message => {
  if (message.content === `!j`) {
  	client.emit(`guildMemberAdd`, message.member); }
  if (message.content === `!l`) {
	client.emit(`guildMemberRemove`, message.member); }
});

client.login(config.token);
