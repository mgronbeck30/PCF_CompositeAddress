import * as React from 'react';
import { TextField,ITextFieldStyleProps,ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import {DefaultButton, Callout,DirectionalHint, Link, getTheme, FontWeights, mergeStyleSets, getId, IconButton } from 'office-ui-fabric-react';
import { ColorClassNames } from '@uifabric/styling';



export interface compositeControlProps{
    onFullnameChanged?:(newValue:string)=>(void);
    onFirstNameChanged?:(newValue:string)=>(void);
    onLastNameChanged?:(newValue:string)=>(void);
    onAddress1Changed?:(newValue:string)=>(void);
    onAddress2Changed?:(newValue:string)=>(void);
    onCityChanged?:(newValue:string)=>(void);
    onStateChanged?:(newValue:string)=>(void);
    onZipChanged?:(newValue:string)=>(void);
    onEllipsisChanged?:(newValue:boolean)=>(void);
    fullName?: string;
    firstName?: string;
    lastName?:string;
    address1?:string;
    address2?:string;
    city?:string;
    state?:string;
    zip?:string;
    showEllip?:boolean;
}
export interface IcompositeControl extends React.ComponentState,compositeControlProps
{
    isCalloutVisible?: boolean;
    directionalHint?: DirectionalHint;
    isBeakVisible?: boolean;
    gapSpace?: number;
    beakWidth?: number;
    

}
const theme = getTheme();
const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32
  },
  configArea: {
    minWidth: '300px',
    display: 'inline-block'
  },
  callout: {
    maxWidth: 300
  },
  calloutExampleButton: {
    width: '100%'
  },
  header: {
    padding: '18px 24px 12px'
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      color: theme.palette.neutralPrimary,
      fontWeight: FontWeights.bold
    }
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px'
  },
  xbutton: {
    top: 0,
    right: 0,
    position: "absolute",
    zIndex: 2
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      color: theme.palette.neutralPrimary,
      fontWeight: FontWeights.semilight
    }
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary
    }
  ],
  myclass:{
    borderColor: ColorClassNames.red
  },
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap'
  }

}); 
export class compositeControl extends React.Component<compositeControlProps, IcompositeControl> {
    private _menuButtonElement: HTMLElement | null;
    private _labelId: string = getId('callout-label');
    private _descriptionId: string = getId('callout-description');
    //public state: ITextFieldControlledExampleState = { value1: '' };
    constructor(props:compositeControlProps){
        super(props);

        this.state = {
            firstName: props.firstName?props.firstName:'',
            lastName: props.lastName?props.lastName:'',
            address1: props.address1?props.address1:'',
            address2: props.address2?props.address2:'',
            city: props.city?props.city:'',
            state: props.state?props.state:'',
            zip: props.zip?props.zip:'',
            fullName: props.fullName?props.fullName:props.address1 + ' ' + props.address2 + ' ' +props.city + ', ' + props.state + ' ' + props.zip,
            showEllip: true,
            isCalloutVisible: false,
            isBeakVisible: true,
        };
    }

    render():JSX.Element{
        const { isCalloutVisible, showEllip, isBeakVisible, directionalHint, gapSpace, beakWidth } = this.state;
    return (
        <div className='wrapper' ref={menuButton => (this._menuButtonElement = menuButton)}>
        <TextField  
            placeholder = '---'
            readOnly = {true}
            styles= {{ field:{ fontWeight: "bold", borderColor:ColorClassNames.whiteTranslucent40 },
                  fieldGroup:  {borderColor:theme.palette.whiteTranslucent40,borderTopColor: theme.palette.whiteTranslucent40},
                  wrapper: {borderColor:ColorClassNames.whiteTranslucent40},
                  }}
            value={this.state.fullName}
            onChange = {this.onChangeText}
            onClick = {this._onShowMenuClicked}
            //className={styles.myclass}
            //borderless = {true}
            />
        {showEllip ? (<div className = 'button' >
        <IconButton
            className='reactbutton'
            title='Click to Populate'
            iconProps={{ iconName: 'More' }}
            onClick={this._onShowMenuClicked}
            styles={{ root: { color:ColorClassNames.neutralDark },
            rootHovered: {color:ColorClassNames.blackHover},
            rootPressed: {color:ColorClassNames.blackTranslucent40}   }}
        /></div>) : null}
        {isCalloutVisible ? (
          <Callout
            className={styles.callout}
            gapSpace={0}
            target={this._menuButtonElement}
            isBeakVisible={true}
            beakWidth={10}
            onDismiss={this._onCalloutDismiss}
            directionalHint={DirectionalHint.rightCenter}
            setInitialFocus={true}
          >
            <div className={styles.inner}>
            <IconButton
                className={styles.xbutton}
                title='Click to Close'
                iconProps={{ iconName: 'ChromeClose' }}
                onClick={this._onCalloutDismiss}
                styles={{ root: { color:ColorClassNames.neutralDark },
                          rootHovered: {color:ColorClassNames.blackHover},
                          rootPressed: {color:ColorClassNames.blackTranslucent40}   }}
            /></div>
            <div className={styles.inner}>
            {/*<TextField  
                label='First Name'
                id='fn'
                styles= {{ field:{ fontWeight: "bold" }}}
                value={this.state.address1}
                onChange = {this.onChangeFirstName}
                className='reactinput' 
            />
            <TextField  
                label='Last Name'
                id='ln'
                styles= {{ field:{ fontWeight: "bold" }}}
                value={this.state.lastName}
                onChange = {this.onChangeLastName}
                className='reactinput' 
            />*/}
            <TextField  
                label='Address Line 1'
                id='al1'
                styles= {{ field:{ fontWeight: "bold" }}}
                value={this.state.address1}
                onChange = {this.onChangeAddress1}
                className='reactinput' 
            />
            <TextField  
                label='Address Line 2'
                id='al2'
                styles= {{ field:{ fontWeight: "bold" }}}
                value={this.state.address2}
                onChange = {this.onChangeAddress2}
                className='reactinput' 
            />
            <TextField  
                label='City'
                id='cty'
                styles= {{ field:{ fontWeight: "bold" }}}
                value={this.state.city}
                onChange = {this.onChangeCity}
                className='reactinput' 
            />
            <TextField  
                label='State'
                id='st'
                styles= {{ field:{ fontWeight: "bold" }}}
                value={this.state.state}
                onChange = {this.onChangeState}
                className='reactinput' 
            />
            <TextField  
                label='Zip'
                id='zp'
                styles= {{ field:{ fontWeight: "bold" }}}
                value={this.state.zip}
                onChange = {this.onChangeZip}
                className='reactinput' 
            />
            </div>
          </Callout>
        ) : null}
        </div>
        );
    }
    private onChangeText = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue?: string) => {
        this.setState({ fullName: newValue || '' });
        if(this.props.onFullnameChanged){
            this.props.onFullnameChanged(newValue||'')
        }
    };
    
    private onChangeEllipsis = (newValue?: boolean) => {
        this.setState({ showEllip: newValue || false });
        if(this.props.onEllipsisChanged){
            this.props.onEllipsisChanged(newValue||false)
        }
    };
    private onChangeFirstName = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue?: string) => {
        this.setState({ firstName: newValue || '' ,
                        fullName: newValue + ' ' + this.state.lastName || ''
                        }
                      );
        if(this.props.onFirstNameChanged){
            this.props.onFirstNameChanged(newValue||'');
            
        }
    };
    private onChangeLastName = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue?: string) => {
        this.setState({ lastName: newValue || '' ,
                        fullName: this.state.firstName + ' ' + newValue || ''
                      });
        if(this.props.onLastNameChanged){
            this.props.onLastNameChanged(newValue||'')
        }
    };
  private onChangeAddress1 = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue?: string) => {
    this.setState({ address1: newValue || '' ,
                    fullName: newValue + ' ' + this.state.address2 + ' ' + this.state.city + ', ' +this.state.state + ' ' + this.state.zip || ''
                  });
    if(this.props.onAddress1Changed){
        this.props.onAddress1Changed(newValue||'')
    }
};
private onChangeAddress2 = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue?: string) => {
  this.setState({ address2: newValue || '' ,
                    fullName: this.state.address1 + ' ' + newValue + ' ' + this.state.city + ', ' +this.state.state + ' ' + this.state.zip || ''
                });
  if(this.props.onAddress2Changed){
      this.props.onAddress2Changed(newValue||'')
  }
};
private onChangeCity = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue?: string) => {
  this.setState({ city: newValue || '' ,
                    fullName: this.state.address1 + ' ' + this.state.address2 + ' ' + newValue + ', ' +this.state.state + ' ' + this.state.zip || ''
                });
  if(this.props.onCityChanged){
      this.props.onCityChanged(newValue||'')
  }
};
private onChangeState = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue?: string) => {
  this.setState({ state: newValue || '' ,
                    fullName: this.state.address1 + ' ' + this.state.address2 + ' ' + this.state.city + ', ' + newValue + ' ' + this.state.zip || ''
                });
  if(this.props.onStateChanged){
      this.props.onStateChanged(newValue||'')
  }
};
private onChangeZip = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue?: string) => {
  this.setState({ zip: newValue || '' ,
                    fullName: this.state.address1 + ' ' + this.state.address2 + ' ' + this.state.city + ', ' +this.state.state + ' ' + newValue || ''
                });
  if(this.props.onZipChanged){
      this.props.onZipChanged(newValue||'')
  }
};
    private _onCalloutDismiss = (): void => {
        this.setState({
          isCalloutVisible: false
        });
      };
    
      private _onShowMenuClicked = (): void => {
        this.setState({
          isCalloutVisible: !this.state.isCalloutVisible
        });
      };
}