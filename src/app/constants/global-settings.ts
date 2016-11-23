import {environment} from '../../environments/environment';
export class GlobalSettings {
    public static get API_ENDPOINT(): string {
        return environment.apiEndpoint;
    }


}
