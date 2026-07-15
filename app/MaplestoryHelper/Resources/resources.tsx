export interface Resource {
    name: string;
    image?: string;
    description: string;
    author?: string;
    link?: string;
}

export interface GeneralResource extends Resource {
    category: "Guide" | "Info" | "Discord" | "Fashion";
    authorLink?: string;
}

export interface ClassResource {
    name: string;
    image?: string;
    guide?: string;
    discord?: string;
    hexa?: string;
    lastUpdated?: string;
}