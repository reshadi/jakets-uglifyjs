import * as Jakets from "jakets/lib/Jakets";
import * as Tsc from "jakets/lib/TscTask";

import { UglifyTask } from "../lib/UglifyjsTask";

let MakeRelative = Jakets.CreateMakeRelative(__dirname);

let CompileDir = Jakets.BuildDir + "/compile";

Jakets.GlobalTaskNs(
  "test"
  , "uglify"
  , [
    UglifyTask(
      "uglify"
      , CompileDir + "/all.js"
      , [CompileDir + "/Main.js"]
      , [
        Tsc.TscTask(
          "tsc"
          , [MakeRelative("./Main.ts")]
          , []
          , {
            outDir: CompileDir,
            module: Tsc.ModuleKind.ES2015,
            target: Tsc.ScriptTarget.ES5
          }
        )
      ]
      , {
      }
    )
  ]
  , async () => {
    require("../" + CompileDir + "/all");
  }
);
