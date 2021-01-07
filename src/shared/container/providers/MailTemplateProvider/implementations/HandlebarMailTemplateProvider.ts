import IParseMailTemplateDto from "../dtos/IParseMailTemplateDto";
import IMailTemplateProvider from "../models/IMailTemplateProvider";
import handlebars from 'handlebars';

import fs from 'fs';

class HandlebarMailTemplateProvider implements IMailTemplateProvider {

  public async parse({file, variables}: IParseMailTemplateDto): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarMailTemplateProvider;
