import {getAllLabelsRequest} from "$lib/api/labelApi";

interface Label {
  id: number;
  name: string;
  color: string;
  isDefault: boolean;
}

class LabelStore {
  label = $state<Label | null>(null);
  labels = $state<Label[]>([]);

  async init() {
    try {
      const res = await getAllLabelsRequest();
      this.labels = res?.data;
      console.log(res);
      console.log(this.labels);
    } catch (e) {
      console.log(e);
    }
  }

  setLabel(label: Label | null) {
    this.label = label;
  }

  clearLabel() {
    this.label = null;
  }

  setLabels(labels: Label[]) {
    this.labels = labels;
  }
}

export const labelStore = new LabelStore();