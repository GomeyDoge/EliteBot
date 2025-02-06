import {
    SlashCommandPartial,
    SlashCommandOptionType
} from 'https://deno.land/x/harmony/mod.ts';

export const commands: SlashCommandPartial[] = [
    {
        name: "calculate",
        description: "Calculate the max possible damage stat on a weapon.",
        options: [
            {
                name: "damage",
                description: "This is the damage listed on your gun while it is common.",
                required: true,
                type: SlashCommandOptionType.NUMBER
            },
            {
                name: "percentage",
                description: "This is the percentage listed next to the damage value while the gun is common.",
                required: true,
                type: SlashCommandOptionType.NUMBER
            }
        ]
    }
];