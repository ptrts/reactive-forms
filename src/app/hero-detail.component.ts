import {Component, Input, OnChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Address, Hero, states} from './data-model';
@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnChanges {

  @Input() hero: Hero;

  heroForm: FormGroup;
  states = states;

  constructor(
    private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: '',
      secretLairs: this.fb.array([]),
      power: '',
      sidekick: ''
    });
  }

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name
    });
    this.setAddresses(this.hero.addresses);
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  };

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  addLair() {

    // Мы определили себе в компоненте свойство secretLairs
    // Тип у этого свойства - это FormArray
    // Это то элемент из дерева модели формы, который мы вынесли себе отдельно в свойство
    // У нас есть свойство компонента heroForm типа FormGroup
    // Также у нас есть свойство компонента secretLairs типа FormArray

    // Здесь мы берем наш билдер, и командуем ему сделать новую группу
    // Эту новую группу мы добавляем в наше FormArray

    // Здесь группу мы только инициализируем. Сооветственно, для каждого свойства в Address
    // у нас будет создано FormControl. С некоторыми из этих FormControl у нас будет связь
    // с элементами темплейта, с другими же у нас ничего не будет

    this.secretLairs.push(this.fb.group(new Address()));
  }
}
