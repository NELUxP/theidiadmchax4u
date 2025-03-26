// types/download-data.d.ts
declare module "@/data/download-data.json" {
    interface Changelog {
      date: string;
      version: string;
      changes: string[];
    }
  
    interface Edition {
      title: string;
      description: string;
      imageUrl: string;
      features: string[];
      buttonText: string;
      changelogs: Changelog[];
    }
  
    interface Installation {
      title: string;
      steps: string[];
      note: {
        title: string;
        content: string;
      };
    }
  
    const data: {
      title: string;
      editions: Edition[];
      installation: Installation;
    };
  
    export default data;
  }