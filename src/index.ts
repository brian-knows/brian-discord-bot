import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import * as dotenv from "dotenv";
import { brian } from "./brian.js";
import { askCommand } from "./commands/index.js";

dotenv.config();

const CLIENT_TOKEN = process.env.CLIENT_TOKEN;

if (!CLIENT_TOKEN) {
  throw new Error("No CLIENT_TOKEN provided.");
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (discord) => {
  try {
    console.log(`🧠 Client ready!`);

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(CLIENT_TOKEN);

    // The put method is used to fully refresh all commands in the guild with the current set
    await rest.put(Routes.applicationCommands("1121781275825541178"), {
      body: [askCommand],
    });

    client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) {
        console.log(`❌ Interaction is not a command.`);
        return;
      }

      const prompt = interaction.options.getString("input");

      if (!prompt) {
        console.log(`❌ No prompt provided.`);
        return;
      }

      await interaction.reply(`🧠 **${prompt}**\n\nBrian is thinking...`);

      // Call Brian SDK
      console.log(`🧠 Calling Brian SDK...`);
      const { text, sourceDocuments } = await brian.ask({
        prompt,
        kb: process.env.BRIAN_KB || "public-knowledge-box",
      });

      const buttons = [];

      if (sourceDocuments.length > 0) {
        for (const sourceDocument of sourceDocuments) {
          buttons.push(
            new ButtonBuilder()
              .setLabel(sourceDocument.metadata.title)
              .setURL(sourceDocument.metadata.source)
              .setStyle(ButtonStyle.Link)
          );
        }
      }

      const row = new ActionRowBuilder().addComponents(...buttons);

      await interaction.editReply({
        content: `🧠 **${prompt}**\n\n${text}`,
        // @ts-ignore
        components: [row],
      });
    });
  } catch (error) {
    console.error(error);
  }
});

// Log in to Discord with your client's token
client.login(CLIENT_TOKEN);
