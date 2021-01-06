import IParseMailTemplateDto from "../dtos/IParseMailTemplateDto";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class FakeMailTemplateProvider implements IMailTemplateProvider {

  public async parse({template}: IParseMailTemplateDto): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
