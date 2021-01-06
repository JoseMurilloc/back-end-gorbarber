import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider'

class BCryptHashProvider implements IHashProvider {

  public async generateHash(payload: string): Promise<string> {
    const payloadHash = await hash(payload, 8)
    return payloadHash;
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }

}

export default BCryptHashProvider;
