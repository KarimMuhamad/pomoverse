import {addLabelRequest, deleteLabelRequest, editLabelRequest, getAllLabelsRequest} from "$lib/api/labelApi";

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
    if(this.labels.length > 0) return;

    try {
      const res = await getAllLabelsRequest();
      this.labels.push(...res?.data);

      const timerRuntime = localStorage.getItem('timer-runtime');
      if (timerRuntime) {
        const runtimeObj = JSON.parse(timerRuntime);
        if (runtimeObj.labelId) {
          const foundLabel = this.labels.find(label => label.id === runtimeObj.labelId);
          if (foundLabel) {
            this.setLabel(foundLabel);
            return;
          }
        }
      }

      this.setLabel(this.labels[0]);
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

  async deleteLabel(id: number) {
    try {
      const res = await deleteLabelRequest(id);
      console.log(res);
      this.labels = this.labels.filter(label => label.id !== id);
    } catch (e) {
      console.log(e);
    }
  }

  async editLabel(id: number, label: Label) {
    try {
      const res = await editLabelRequest(id, label);
      this.labels = this.labels.map(l => l.id === id ? res?.data : l);
    } catch (e) {
      console.log(e);
    }
  }
}

export const labelStore = new LabelStore();