import { Component, input } from '@angular/core';
import { TagProp } from '../shared/models/board';
import { TAG_COLORS } from '../shared/models/tag-colors';

@Component({
  selector: 'app-chip',
  imports: [],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
})
export class Chip {
  public chips = input.required<TagProp[] | undefined>();
  public editMode = input<boolean>(false);

  protected readonly palette = TAG_COLORS;
}
