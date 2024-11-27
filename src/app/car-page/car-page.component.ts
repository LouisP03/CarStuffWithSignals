import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Car} from '../models/car.model';
import {Manufacturer} from '../models/manufacturer.model';
import {CarService} from '../services/car.service'
import {ManufacturerService} from '../services/manufacturer.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-car-page',
  imports: [],
  templateUrl: './car-page.component.html',
  standalone: true,
  styleUrl: './car-page.component.css'
})
export class CarPageComponent implements OnInit {
  public carService: CarService = inject(CarService);
  public manufacturerService: ManufacturerService = inject(ManufacturerService);
  public manufacturerMap = new Map<number, Manufacturer>();

  private carsSignal = signal<Array<Car>>([]);
  private manufacturersSignal = signal<Array<Manufacturer>>([]);

  protected carsWithManufacturers = computed(() => {
    const cars = this.carsSignal();
    const manufacturers = this.manufacturersSignal();

    manufacturers.forEach((manufacturer) => {
      this.manufacturerMap.set(manufacturer.id, manufacturer);
    });

    return cars.slice(0, 10).map((car) => {
      const manufacturer = this.manufacturerMap.get(car.manufacturer);
      return {
        model: car.model,
        manufacturerName: manufacturer ? manufacturer.name : "Unknown Manufacturer",
      }
    });

  })

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.carService.getCars().subscribe((cars) => {
      this.carsSignal.set(cars);
    });

    this.manufacturerService.getManufacturers().subscribe((manufacturers) => {
      this.manufacturersSignal.set(manufacturers);
    })
  }
}


