import IParseMailTemplateDto from "../dtos/IParseMailTemplateDto";
import IMailTemplateProvider from "../models/IMailTemplateProvider";
import handlebars from 'handlebars';

class HandlebarMailTemplateProvider implements IMailTemplateProvider {

  public async parse({template, variables}: IParseMailTemplateDto): Promise<string> {

    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables);
  }
}

export default HandlebarMailTemplateProvider;
