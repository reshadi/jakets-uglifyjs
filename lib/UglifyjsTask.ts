import * as Fs from "fs";
import * as Path from "path";

import * as Jakets from "jakets/lib/Jakets";
import * as Task from "jakets/lib/task/Task";
import * as Uglify from "uglify-js";
// import { } from "jakets/lib/task/FileTask";

export function UglifyTask(
  name: string
  , outputFilename: string
  , inputFilenames: string[]
  , dependencies: Task.TaskDependencies
  , options?: Uglify.MinifyOptions
): Jakets.FileTaskType {
  //Make a copy of all options before changing them
  // options = Object.assign({}, options);

  let depInfo = new Jakets.CommandInfo({
    Name: name,
    Dir: Path.resolve(Jakets.LocalDir),
    Command: "rollup",
    Inputs: inputFilenames,
    Outputs: [outputFilename],
    Options: options,
    Dependencies: Task.Task.NormalizeDedpendencies(dependencies),
  });

  return Jakets.FileTask(depInfo.DependencyFile, depInfo.AllDependencies, async function () {
    let sectionName = `uglifyjs ${depInfo.Data.Name} with ${depInfo.DependencyFile}`;
    console.time(sectionName);

    depInfo.Write();
    let result = Uglify.minify(
      inputFilenames.map(file => Fs.readFileSync(file, "utf8")),
      options
    );
    Fs.writeFileSync(outputFilename, result.code, { encoding: "utf8" });

    console.timeEnd(sectionName);
  });
}
