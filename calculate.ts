export enum Rarity { // Take these with a grain of salt they haven't been proven to be correct
    COMMON = 40,
    UNCOMMON = 90,
    RARE = 140,
    EPIC = 190,
    LEGENDARY = 240,
    CELESTIAL = 290,
    GOD = 340,
    GLITCHED = 390
};

export function adjustDamage( damage: number, percentage: number ): number {
    return damage - (damage * (percentage / 100));
}

export function calculateDamage( base_damage: number, rarity: Rarity ): number {
    return base_damage + (base_damage * (rarity / 100));
}