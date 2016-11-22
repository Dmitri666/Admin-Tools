import {ContactDto} from './ContactDto';
import {IModelEntity} from '../../../../core/qdata/src/IModelEntity';
// $Classes/Enums/Interfaces(filter)[template][separator]
// filter (optional): Matches the name or full name of the current item. * = match any,
// wrap in [] to match attributes or prefix with : to match interfaces or base classes.
// template: The template to repeat for each matched item
// separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

// More info: http://frhagn.github.io/Typewriter/

export class CustomerDto implements IModelEntity {
    id: number;
    edvNr: number;
    firma11: string;
    firma21: string;
    street: string;
    contacts: ContactDto[];
}