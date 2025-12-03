import { createClient } from "@/lib/supabase/server";

type useMetaType = {
  getMeta: () => Promise<{
    title: string;
    description: string;
    keywords: string[];
    authors: string
    applicationName: string;
    creator: string;
  }>;
}



const hendlerTopic = async (id: string | number) => {
  const supabase = await createClient();

  console.log(`supabase`, supabase);
  return {
    getMeta: async () => {
      const { data, error } = await supabase
      .from("topic")
      .select("*")
      .eq("status", "publish")
      .eq("id", id)
      .eq("isView", true)
     .single();

      if (error) return console.log(`error`, error);
      
      return {
        title : data.title,
        description: data.title,
        keywords: data.category,
        applicationName: 'Mw Log',
        authors: '돌멩이떼굴',
        creator: '강민욱'
      }
    }
  }
}

const hendlerProduct = (id: string | number) => {}

const metaInit = {
  'topic': hendlerTopic,
  'product': hendlerProduct,
}

const metaFactory = (tableName: string, id: string | number):useMetaType => {
  return metaInit[tableName](id);
}


export {metaFactory};