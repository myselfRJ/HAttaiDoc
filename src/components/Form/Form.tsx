import React, {Component, ReactElement} from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';
import TextField from '../TextField';
import Dropdown from '../DropDown';
import DateTimePicker from '../DateTimePicker';

export interface FormValidators {
  check: any;
  message: string;
  num?: number;
}

export interface FormModel {
  field: string;
  label: string;
  placeholder: string;
  required: boolean;
  type: string;
  validators: FormValidators[];
  value: string | number;
  mode?: KeyboardTypeOptions | 'datetime' | 'date' | 'time';
  icon?: string;
  disabled?: boolean;
  isPassword?: boolean;
  customError?: string;
  labelStyle?: StyleProp<TextStyle>;
  maximumDate?: Date;
  options?: {
    label: string;
    value: string;
  }[];
  // leftIcon?: () => React.ReactElement | null | undefined;
}

export interface FormDataModel {
  [key: string]: string | number;
}

interface FormProps {
  formUpdated?: boolean;
  values: any;
  model: FormModel[];
  testId?: string;
  onChange?: (field: string, value: string, formData: FormDataModel) => void;
  card?: any;
  hasError?: boolean;
}

export default class Form extends Component<FormProps> {
  state: {formData: FormDataModel; isFormValid: boolean} = {
    formData: {},
    isFormValid: false,
  };

  componentDidMount() {
    this.prepareFormData();
  }

  componentDidUpdate(prevProps: Readonly<FormProps>) {
    if (
      this.props.formUpdated !== prevProps.formUpdated ||
      (Object.keys(this.props.values).length > 0 &&
        this.props.values !== prevProps.values)
    ) {
      this.prepareFormData();
    }
  }

  handleChange = (
    value: string,
    field: string,
    error?: {error: boolean; message: string},
    deleted?: {deletedField: string; DeletedFile: string},
  ) => {
    const formData = JSON.parse(JSON.stringify(this.state.formData));
    // cloneDeep(this.state.formData);
    formData[field] = value;
    if (deleted?.deletedField === field) {
      formData[field + 'deleted'] = deleted.DeletedFile;
    }
    formData[field + 'Error'] = error && error.error;
    this.setState({
      formData,
      isFormValid: this.validateForm(formData),
    });
    if (this.props.onChange) {
      this.props.onChange(field, value, formData);
    }
  };

  validateForm = (formData: FormDataModel): boolean => {
    const {model} = this.props;
    let isFormValid = true;
    model.forEach(item => {
      if (item.required || formData[item.field + 'Error']) {
        isFormValid = isFormValid && !formData[item.field + 'Error'];
      }
    });
    return isFormValid;
  };

  getFormData = () => {
    const {formData, isFormValid} = this.state;
    return {formData, isFormValid};
  };

  resetForm = () => {
    this.prepareFormData();
  };

  prepareFormData() {
    const {model, values} = this.props;
    const formData: any = {};
    if (Object.keys(values).length !== 0) {
      model.forEach(item => {
        formData[item.field] =
          values &&
          (values[item.field] || values[item.field] === 0) &&
          values[item.field] !== ''
            ? values[item.field]
            : item.value
            ? item.value
            : '';
        if (formData[item.field] || !item.required) {
          formData[item.field + 'Error'] = !(
            values &&
            values[item.field] &&
            item.required
          );
        } else {
          formData[item.field + 'Error'] = !(
            values &&
            values[item.field] &&
            item.required
          );
        }
      });
      this.setState({formData, isFormValid: this.validateForm(formData)});
    } else {
      model.forEach(item => {
        formData[item.field] =
          values && values[item.field]
            ? values[item.field]
            : item.value
            ? item.value
            : '';
        formData[item.field + 'Error'] = item.required && !item.value;
      });
      this.setState({formData, isFormValid: this.validateForm(formData)});
    }
  }

  renderFormFields() {
    const {model, card} = this.props;
    const {formData} = this.state;
    const arrayOfFields: ReactElement[] = [];
    model.forEach((item: FormModel, key: number) => {
      switch (item.type) {
        case 'text':
          arrayOfFields.push(
            <View key={key} style={[themeStyles.fullWidth]}>
              <TextField
                field={item.field}
                labelStyle={item.labelStyle}
                label={item.label}
                fieldError={formData[item.field + 'Error'] as string}
                style={[{backgroundColor: card}, styles.textField]}
                value={
                  formData[item.field] || formData[item.field] === 0
                    ? (formData[item.field] as string)
                    : (item.value as string)
                    ? (item.value as string)
                    : undefined
                }
                placeholder={item.placeholder}
                handleText={this.handleChange}
                hasMargin
                keyboardType={item.mode as KeyboardTypeOptions}
                leftIcon={item.icon}
                validators={item.validators}
                editable={!item.disabled}
                hasError={this.props.hasError || false}
                isPassword={item.isPassword}
                customError={item.customError}
              />
            </View>,
          );
          break;
        case 'dropdown':
          arrayOfFields.push(
            <View key={key} style={[themeStyles.fullWidth, {marginTop: 5}]}>
              <Dropdown
                style={styles.dropDownStyle}
                options={item.options || []}
                handleText={this.handleChange}
                field={item.field}
                labelStyle={[themeStyles.fontMedium, styles.dropdownLable]}
                label={item.label}
                placeholder={item.placeholder}
                placeholderStyle={[
                  themeStyles.fontNormal,
                  styles.dropDownPlaceholder,
                ]}
                fieldError={formData[item.field + 'Error'] as string}
                defaultValue={
                  formData[item.field] || formData[item.field] === 0
                    ? (formData[item.field] as string)
                    : (item.value as string)
                    ? (item.value as string)
                    : undefined
                }
                hasMargin
                validators={item.validators}
                hasError={this.props.hasError || false}
                disabled={item.disabled}
              />
            </View>,
          );
          break;
        case 'datetime':
          arrayOfFields.push(
            <View key={key} style={[themeStyles.fullWidth]}>
              <DateTimePicker
                handleText={this.handleChange}
                field={item.field}
                labelStyle={[
                  item.labelStyle,
                  styles.dropdownLable,
                  themeStyles.fontMedium,
                ]}
                label={item.label}
                fieldError={formData[item.field + 'Error'] as string}
                validators={item.validators}
                hasError={this.props.hasError || false}
                disabled={item.disabled}
                placeholder={item.placeholder}
                maximumDate={item.maximumDate}
                date={
                  formData[item.field] || formData[item.field] === 0
                    ? new Date(formData[item.field] as string)
                    : ('' as any)
                  // formData[item.field] || formData[item.field] === 0
                  // ? new Date(formData[item.field] as string)
                  // : new Date(item.value as string)
                  // ? new Date(item.value as string)
                  // : new Date()
                }
                type={item.mode as 'datetime' | 'date' | 'time'}
              />
            </View>,
          );
          break;
        default:
          break;
      }
    });

    return arrayOfFields;
  }

  render() {
    return (
      <View data-test={this.props.testId}>
        <View style={themeStyles.flexWrap}>{this.renderFormFields()}</View>
      </View>
    );
  }

  static defaultProps = {
    values: {},
    testId: '',
  };
}

const styles = StyleSheet.create({
  textField: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: lightTheme.colors.white,
    borderColor: lightTheme.colors.primary,
    borderWidth: 0.5,
  },
  dropDownPlaceholder: {
    color: '#9C9C9C',
    fontSize: 12,
  },
  dropdownLable: {
    fontSize: 14,
    color: lightTheme.colors.black,
    fontWeight: '500',
  },
  dropDownStyle: {
    height: 45,
    borderRadius: 8,
    borderColor: lightTheme.colors.primary,
  },
});
