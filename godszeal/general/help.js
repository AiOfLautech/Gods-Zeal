let Godszeald = async (m, { Gifted }) => {

    let godszealButtons = [
          [
            { text: 'WaChannel', url: global.godszealWaChannel }
        ]
    ];

    Godszeal.reply({ text: `Need help? Kindly Consult my Owner: @${global.ownerUsername}\nEspecially incase a Command is not Working` }, godszealButtons, m)
}

Godszeald.command = ['help']
Godszeald.desc = 'Get Help'
Godszeald.category = ['general']

module.exports = Godszeald
