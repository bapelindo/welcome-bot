const Discord = require(`discord.js`);
const Canvas = require(`canvas`);
const fs = require(`fs`);
const config = JSON.parse(fs.readFileSync(`config.json`, `utf8`));
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

  ctx.save();
  ctx.translate(0, 0);
  ctx.beginPath();
  ctx.arc(916.5, 473, 220, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: `png`, size:1024 }));
  ctx.drawImage(avatar, 695, 253, 441, 441);
  ctx.restore();

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `welcome-image.png`);
  const embed = new Discord.MessageEmbed();
	
	.setColor(`RANDOM`)
	.setAuthor(`${member.guild.name}`, `${member.guild.iconURL({ format : `gif`, dynamic : `true`})}`)
	.setTitle(`Welcome ${member.user.username} To ${member.guild.name} :tada:`)
	.setDescription(`config.desc`)
	.setThumbnail(`${member.user.displayAvatarURL({ format: `png`, dynamic : `true`})}`)
	.setTimestamp()

  cha.send(attachment);
  chs.send(embed);

});

client.on(`message`, message => {
  if (message.content === `!join`) {
    client.emit(`guildMemberAdd`, message.member); } });

client.login(config.token);

