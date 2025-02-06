import "jsr:@std/dotenv/load";
import {
    event,
    CommandClient,
    slash,
    Embed,
    SlashCommandInteraction
} from 'https://deno.land/x/harmony/mod.ts'

import { commands } from "./commands.ts";
import { calculateDamage, adjustDamage, Rarity } from "./calculate.ts";

class EliteBot extends CommandClient {
    constructor() {
        super( {
            prefix: [ '~' ],
            caseSensitive: false,
            intents: [
                'GUILDS',
                'DIRECT_MESSAGES',
                'GUILD_MESSAGES'    
            ],
            token: Deno.env.get( "TOKEN" )
        } );
    };

    @event()
    ready(): void {
        console.log( `[EliteBot] >> Logged in as ${this.user?.tag}` );
        commands.forEach( command => {
            this.interactions.commands.create( command, Deno.env.get( "SERVER_ID" ) )
                .then( (cmd) => console.log( `Created slash command ${cmd.name}` ) )
                .catch( (err) => console.log( `Failed to create command ${err}!` ) );
        } );
    }

    @slash( "calculate" )
    Calculate(i: SlashCommandInteraction) {
        const options = i.data?.options;

        const damage = options.find( (option) => option.name === "damage" )?.value;
        const percentage = options.find( (option) => option.name === "percentage" )?.value;

        const adjustedDamage = Math.round( adjustDamage( damage, percentage ) );

        const embed = new Embed()
        .setTitle( "Damage Calculator" )
        .setDescription( `Base Damage Adjusted: \`${adjustedDamage.toFixed(2)}\`` )
        .setColor( 14681606 )
        .addField( "Common", `\`${calculateDamage( adjustedDamage, Rarity.COMMON ).toFixed(2)}\``, true )
        .addField( "Uncommon", `\`${calculateDamage( adjustedDamage, Rarity.UNCOMMON ).toFixed(2)}\``, true )
        .addField( "Rare", `\`${calculateDamage( adjustedDamage, Rarity.RARE ).toFixed(2)}\``, true )
        .addField( "Epic", `\`${calculateDamage( adjustedDamage, Rarity.EPIC ).toFixed(2)}\``, true )
        .addField( "Legendary", `\`${calculateDamage( adjustedDamage, Rarity.LEGENDARY ).toFixed(2)}\``, true )
        .addField( "Celestial", `\`${calculateDamage( adjustedDamage, Rarity.CELESTIAL ).toFixed(2)}\``, true )
        .addField( "God", `\`${calculateDamage( adjustedDamage, Rarity.GOD ).toFixed(2)}\``, true )
        .addField( "Glitched", `\`${calculateDamage( adjustedDamage, Rarity.GLITCHED ).toFixed(2)}\``, true )
        .setFooter( "Written by @realdotty" )
        //.setTimestamp( Date.now() );

        i.respond( {
            embeds: [ embed ],
            ephemeral: true
        } );
    }
};

new EliteBot().connect(); // Log in