import { FormattedPermissionInterface } from '../types/interface/roles'

declare global {
    // eslint-disable-next-line no-var
    var userPermissions: FormattedPermissionInterface[]
}
