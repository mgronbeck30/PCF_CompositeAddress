import {IInputs, IOutputs} from "./generated/ManifestTypes";
import {initializeIcons} from '@uifabric/icons';
import {compositeControl, compositeControlProps} from "./callout";
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { DefaultButton, Callout, Link, getTheme, FontWeights, mergeStyleSets, getId } from 'office-ui-fabric-react';
import { isNullOrUndefined } from "util";

export class pfecompositeAddressControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private notifyOutputChanged: () => void;
	private _container: HTMLDivElement;
	private _fullname: string;
	private _firstname: string;
	private _lastname: string;
	private _address1: string;
	private _address2: string;
	private _city: string;
	private _state: string;
	private _zip: string;
	private _showellip: boolean;
	private _refreshData: EventListenerOrEventListenerObject;
	private _inputElement: React.ReactElement;
	private _context: ComponentFramework.Context<IInputs>;
	private props: compositeControlProps = {
		onFullnameChanged: this.fullNameValueChanged.bind(this),
		onFirstNameChanged: this.fnValueChanged.bind(this),
		onLastNameChanged: this.lnValueChanged.bind(this),
		onAddress1Changed: this.address1ValueChanged.bind(this),
		onAddress2Changed: this.address2ValueChanged.bind(this),
		onStateChanged:this.stateValueChanged.bind(this),
		onCityChanged:this.cityValueChanged.bind(this),
		onZipChanged:this.zipValueChanged.bind(this),
		onEllipsisChanged: this.showEllipChanged.bind(this)
		
	};
	private fullNameValueChanged(newValue:string){
		this.props.fullName = newValue;
		this.notifyOutputChanged();
	}
	private fnValueChanged(newValue:string){
		this.props.firstName = newValue;
		this._firstname = newValue;
		this.notifyOutputChanged();
	}
	private lnValueChanged(newValue:string){
		this.props.lastName = newValue;
		this._lastname = newValue;
		this.notifyOutputChanged();
	}
	private address1ValueChanged(newValue:string){
		this.props.address1 = newValue;
		this._address1 = newValue;
		this.notifyOutputChanged();
	}
	private address2ValueChanged(newValue:string){
		this.props.address2 = newValue;
		this._address2 = newValue;
		this.notifyOutputChanged();
	}
	private stateValueChanged(newValue:string){
		this.props.state = newValue;
		this._state = newValue;
		this.notifyOutputChanged();
	}
	private cityValueChanged(newValue:string){
		this.props.city = newValue;
		this._city = newValue;
		this.notifyOutputChanged();
	}
	private zipValueChanged(newValue:string){
		this.props.zip = newValue;
		this._zip = newValue;
		this.notifyOutputChanged();
	}
	private showEllipChanged(newValue:boolean){
		this.props.showEllip = newValue;
		this._showellip = newValue;
		this.notifyOutputChanged();
	}
	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._context = context;
		initializeIcons();
		this._container = container;
		this._showellip = true;
		this.props.showEllip = this._showellip;
		
		if(!isNullOrUndefined(context.parameters.fullName))
		{
			this._fullname = context.parameters.fullName.raw || "";
			this.props.fullName = this._fullname;
		}
		else{
			this._fullname =  "";
			this.props.fullName = this._fullname;
		}
		if(!isNullOrUndefined(context.parameters.firstName)){
			this._firstname = context.parameters.firstName.raw || "";
			this.props.firstName = this._firstname;
		}
		else{
			this._firstname =  "";
			this.props.firstName = this._firstname;
		}
		if(!isNullOrUndefined(context.parameters.lastName)){
			this._lastname = context.parameters.lastName.raw || "";
			this.props.lastName = this._lastname;
		}
		else{
			this._lastname =  "";
			this.props.lastName = this._lastname;
		}
		if(!isNullOrUndefined(context.parameters.addressLine1_name)){
			this._address1 = context.parameters.addressLine1_name.raw || "";
			this.props.address1 = this._address1;
		}
		else{
			this._address1 =  "";
			this.props.address1= this._address1;
		}
		if(!isNullOrUndefined(context.parameters.addressLine2_name)){
			this._address2 = context.parameters.addressLine2_name.raw || "";
			this.props.address2 = this._address2;
		}
		else{
			this._address2 =  "";
			this.props.address2 = this._address2;
		}
		if(!isNullOrUndefined(context.parameters.city_name)){
			this._city = context.parameters.city_name.raw || "";
			this.props.city = this._city;
		}
		else{
			this._city =  "";
			this.props.city = this._city;
		}
		if(!isNullOrUndefined(context.parameters.state_name)){
			this._state = context.parameters.state_name.raw || "";
			this.props.state = this._state;
		}
		else{
			this._state =  "";
			this.props.state = this._state;
		}
		if(!isNullOrUndefined(context.parameters.zip_name)){
			this._zip = context.parameters.zip_name.raw || "";
			this.props.zip = this._zip;
		}
		else{
			this._zip =  "";
			this.props.zip = this._zip;
		}
		this.notifyOutputChanged = notifyOutputChanged;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		if(!isNullOrUndefined(context.parameters.fullName) && this._fullname != context.parameters.fullName.raw){
			this._fullname = context.parameters.fullName.raw||"";
		}
		if(this._firstname != context.parameters.firstName.raw){
			this._firstname = context.parameters.firstName.raw||"";
		}
		if(this._lastname != context.parameters.lastName.raw){
			this._lastname = context.parameters.lastName.raw||"";
		}
		if(this._address1 != context.parameters.addressLine1_name.raw){
			this._address1 = context.parameters.addressLine1_name.raw||"";
		}
		if(this._address2 != context.parameters.addressLine2_name.raw){
			this._address2 = context.parameters.addressLine2_name.raw||"";
		}
		if(this._city != context.parameters.city_name.raw){
			this._city = context.parameters.city_name.raw||"";
		}
		if(this._state != context.parameters.state_name.raw){
			this._state = context.parameters.state_name.raw||"";
		}
		if(this._zip != context.parameters.zip_name.raw){
			this._zip = context.parameters.zip_name.raw||"";
		}


		ReactDOM.render(
			this._inputElement = React.createElement(compositeControl,this.props),
			this._container
		);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			firstName:this._firstname,
			lastName:this._lastname,
			addressLine1_name:this._address1,
			addressLine2_name:this._address2,
			city_name:this._city,
			state_name:this._state,
			zip_name:this._zip
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}