import {addLabelRequest, getAllLabelsRequest} from "$lib/api/labelApi";

interface Label {
  id?: number;
  name: string;
  color: string;
  isDefault?: boolean;
}

class LabelStore {
  label = $state<Label | null>(null);
  labels = $state<Label[]>([]);

  async init() {
    try {
      const res = await getAllLabelsRequest();
      // this.label = res?.data[0];
      this.labels.push(...res?.data);
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

  async addLabel(label: Label) {
    try {
      const res = await addLabelRequest(label);
      console.log(res);
      this.labels.push(res?.data);
    } catch (e) {
      console.log(e);
    }
  }
}

export const labelStore = new LabelStore();