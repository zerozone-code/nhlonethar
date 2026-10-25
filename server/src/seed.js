import conneectDB from "./config/db.js";
import "dotenv/config";
import mongoose from "mongoose";
import Story from "./models/Story.js";

const sampleText =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit magnam sequi architecto vel nostrum totam, quia fugiat repellat laudantium error explicabo aspernatur minus facilis voluptatem dicta libero saepe atque, nemo enim eos. Recusandae doloribus, fugiat aliquid sunt sapiente tempore officiis voluptate quasi, quia at reprehenderit magnam quas deleniti excepturi omnis consequatur quisquam dolorem veritatis rem porro maxime obcaecati temporibus. Ea, recusandae dolores quo earum eaque aliquid possimus incidunt harum, iste impedit et provident mollitia inventore ad, nemo quis unde eius neque? Quod et fugit modi nostrum fugiat, maiores saepe possimus facere obcaecati alias atque laboriosam animi unde impedit incidunt, soluta repellat vel magni ipsa? Deserunt ut, totam perspiciatis blanditiis corrupti quia accusantium ea ad, reprehenderit excepturi non nulla perferendis, consectetur nostrum. Distinctio explicabo voluptates, ipsa soluta totam sed. Aperiam, dicta vitae qui illum minima cupiditate fuga. Recusandae eveniet, laudantium ipsam illum nobis in odio. Cum consequuntur recusandae consequatur eaque vel, assumenda quam, aliquam quisquam praesentium quasi ducimus doloremque quo ex minus amet blanditiis cupiditate quibusdam voluptate quod. Beatae quibusdam sapiente similique quidem, laboriosam quam vitae aperiam veritatis ducimus velit provident maiores ea pariatur inventore neque sit rem quasi officia reprehenderit? Odit doloribus est expedita veniam voluptatem, cumque nisi eveniet excepturi!";

const sampleStories = [
  { title: "မိုးရွာတဲ့ညက စကားတစ်ခွန်း", category: "အချစ်" },
  { title: "မိုးရွာတဲ့ညက စကားတစ်ခွန်း", category: "အချစ်" },
  { title: "မပို့ဖြစ်တဲ့ စာတစ်စောင်", category: "အလွမ်း" },
  { title: "နောက်ဆုံး လမ်းဆုံ", category: "ဝမ်းနည်း" },
  { title: "ကော်ဖီသောက်ရင်း ရယ်ခဲ့ရတာ", category: "ဟာသ" },
  { title: "အချိန်ဆိုတာ ဆရာကောင်း", category: "ဘဝအတွေးအခေါ်" },
  { title: "အမျိုးအစားအသစ် စမ်းသပ်ခြင်း", category: "တခြား" },
].map((story) => ({ ...story, text: sampleText }));

const seed = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      throw new Error("this is production, can not seed");
    }

    await conneectDB();
    await Story.deleteMany();
    await Story.insertMany(sampleStories);
    console.log(`smaple short story ${sampleStories.length}`);
  } catch (error) {
    console.error("seed error", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
