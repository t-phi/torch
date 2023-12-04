
/*
{
  meta: {
    type: "dædalus",
    version: "1.0",
    servicetype:  "web",
    config_root: "",
    config_type: "page_config", // use json schema?
  },

  pages: {
      _init: {
          startDecision: check_target,

          decisions: {
              check_target: {
                  nextTrue: ":decodeTarget",
                  nextFalse: ":set_default_target",
                  nextState: "DEFAULT",
                  actions: {
                      validation: {
                          errorCode: "MANDATORY_FIELD",
                          inputName: TARGET,
                          displayValue: "",
                      }, // end validation
                  }, // end actions
              }, //end decision

              set_default_target: { /// candidate for simplication in framework ... string manipulation functions that can be scripted IN configs...
                  nextTrue: ":decodeTarget",
                  nextFalse: ":decode_target",
                  nextState: "DEFAULT",
                  actions: {
                      localAction: {
                         className: ".plugins.localactions.StandardLocalValidationsPlugin",
                         method: "copy",
                         parameters: {
                            value1: default_TARGET,
                         },
                         import: {
                            TARGET: value1,
                         },
                      }, // end localaction
                  }, //end actions
                }, //end page

                decode_target: {
                    nextTrue: "REGISTRATION-USER_DATA-R01-DEFAULT",
                    nextFalse: "REGISTRATION-USER_DATA-R01-DEFAULT",
                    nextState: "DEFAULT",
                    actions: {
                        localAction: {
                           className: ".plugins.localactions.StandardLocalValidationsPlugin",
                           method: "decodeURL",
                           parameters: {
                              value1: default_TARGET,
                           },
                           import: {
                              TARGET: DecodedTarget,
                           },
                        }, // end localaction
                    }, //end actions
                },end decision
          }, // end decisions
      }, //end page


      // Privacy Notice
      REGISTRATION-USER_DATA-R01-DEFAULT: {
          startDecision: check_target,
          decisions: {
              "check_disagree": {
                  nextTrue: "REGISTRATION-USER_DATA-R01-1-DEFAULT",
                  nextFalse: ":check_agree",
                  nextState: "DEFAULT",
                  actions: {
                      validation: {
                          errorCode: "BUTTON_CLICKED",
                          inputName: "__DISAGREE.x",
                          displayValue: "",
                      },
                  }, //end actions
              }, // end decision

              "check_agree": {
                  nextTrue: "REGISTRATION-USER_DATA-R02-DEFAULT",
                  nextFalse: "REGISTRATION-USER_DATA-R01-DEFAULT",
                  nextState: "DEFAULT",
                  actions: {
                      validation: {
                          errorCode: "BUTTON_CLICKED",
                          inputName: "__AGREE.x",
                          displayValue: "",
                      },
                  }, //end actions
              }, // end decision
            }, // end decision set
          }, // end page


          // Privacy Notice
          REGISTRATION-USER_DATA-R02-DEFAULT: {
              startDecision: check_target,
              decisions:
                  "check_disagree": {

                  }, // end decision
                }, // end decision set
              }, // end page





      }, // end page set
} end object


*/


const JSONHelper = require("../utils/JSONHelper");
const Meta = require("./Meta");

class PageFlowConfig {


	constructor( filename, session_token) {
		this.session_token = session_token;

		let json;
		if( typeof filename === 'object')
			json = filename;
		else {
			json = JSONHelper.load(filename);
		}

		this.meta = new Meta(json.meta);

        this.start_pageID = "";
        this.page_flow_set;

		NodeList nl1 = XMLHelper.getNodeList("init", aFileName);

		Node tmp = nl1.item(0);

		NodeList nl2 = XMLHelper.getNodeList("page", aFileName);

		pf = new PageFlowSet(tmp, nl2);
	}

	getStartPageID( parameters ) {

		{app_config, inputs, errors} = parameters

		/*appCfg, ShortDAOSet inputs,
			ErrorDataSet errors) throws Exception { */



		let result = "";

		if (this.page_flow_set == null) {
			return "";
		}

		this.page_directive_set = page_flow_set.getInit();

		let currentDecision = "";

		if (this.page_directive_set != null) {
			//complete entire decision flow for this page before returning the
			// next page to process.

			currentDecision = ":";
			currentDecision += this.page_directive_set.getStartDecision();

			while ( !( currentDecision === "") && (currentDecision.startsWith(":"))  )
			{
				currentDecision = currentDecision.substring(1);
				currentDecision = getNextID(pds, currentDecision, appCfg,
						inputs, errors);

			}

			result = currentDecision;

		} else {
			errors.add(new ErrorData("", "",
					"Error finding page directive set ",
					"Error finding page directive", true));
		}
		if (currentDecision.equals("")) {

			errors.add(new ErrorData("", "", "Error locating currentDecision ",
					"Error locating currentDecision ", true));
			result = "";
		}

		//errors.add( new ErrorData("", "", "FOUND currentDecision ", result,
		// true));

		return result;

	}

	getNextID( {
					page_directive_set,
					current_decision,
					app_config,
					inputs,
					errors
			   })
	{
		let result = "";
		let page_directive = page_directive_set.get(currentDecision); /// change this to go
													 // through all
													 // PageDirectives one at a
													 // time and perform any
													 // validations necessary.

		let current_page = page_directive_set.getPageID();

		if (page_directive != null) {
			if ( this.processPageDirective(current_page, app_config, page_directive, inputs, errors)) {
				//         errors.add( new ErrorData("", "", "Page DIRECTIVE returned
				// true", "" , true));
				//         errors.add( new ErrorData("", "", "Page DIRECTIVE returned
				// true", pd.getNextTrue() , true));
				return page_directive.getNextTrue();
			} else {
				//         errors.add( new ErrorData("", "", "Page DIRECTIVE returned
				// false", "" , true));
				//         errors.add( new ErrorData("", "", "Page DIRECTIVE returned
				// false", pd.getNextFalse() , true));
				return page_directive.getNextFalse();
			}
		} else {
			errors.add(new ErrorData("", "",
					"Error finding page directive for decision ID: "
							+ current_decision,
					"Error finding page directive for decision ID: "
							+ current_decision, true));
		}

		return result;

	}

	// returns an empty string if the current page is not a valid page id.

	getNextPageID(
		{
			current_page,
			app_config,
			inputs,
			errors
		})
	{
		let result = "";

		if (this.page_flow_set == null) {
			return "";
		}
		let page_directive_set = this.page_flow_set.get(current_page);
		let current_decision = "";

		if (page_directive_set != null) {
			//complete entire decision flow for this page before returning the
			// next page to process.

			current_decision = ":";
			current_decision += page_directive_set.getStartDecision();

			while (! (current_decision === "")	&& (current_decision.startsWith(":")) )
			{
				current_decision = current_decision.substring(1);
				current_decision = this.getNextID(
					page_directive_set,
					current_decision,
					app_config,
					inputs,
					errors
				);
			}

			result = current_decision;

		} else {
			errors.add(new ErrorData("", "",
							"Error finding page directive set for page: "
									+ currentPage,
							"Error finding page directive set for page: "
									+ currentPage, true));
		}
		if (currentDecision.equals("")) {

			errors.add(new ErrorData("", "",
					"Error locating currentDecion within page: " + currentPage,
					"Error locating currentDecision within page: "
							+ currentPage, true));
			result = currentPage;
		}

		return result;

	}

	processPageDirective({
							 current_page,
							 app_config,
							 page_directive,
							 inputs,
							 errors
						 })
	{

		let subtasks_pass = true;
		for (let j = 0; (j < page_directive.getNumSubTasks()); j++) {
			let page_directive_task = page_directive.getSubTask(j);
			if (page_directive_task != null) {
				if (page_directive_task.type() === "PageDirectiveSoapCall" ) {
					if (! this.processSoapCall(

							current_page,
							app_config,
							page_directive_task,
							inputs,
							errors)
					)
					{
						subtasks_pass = false;
					}

				}
				if (page_directive_task.type() === "PageDirectiveAction") {
					if (!this.processAction(
							current_page,
							app_config,
							page_directive_task,
							inputs,
							errors)
					)
					{
						subtasks_pass = false;
					}

				}
				if (page_directive_task.type() === "PageDirectiveLocalAction") {
					if (!this.processLocalAction(
							current_page,
							app_config,
							page_directive_task,
							inputs,
							errors)
					)
					{
						subtasks_pass = false;
					}

				} else if (page_directive_task.type() === "PageDirectiveValidateAction") {
					if (!this.processValidationAction(
							currentPage,
							app_config,
							page_directive_task,
							inputs,
							errors)
				)
					{
						subtasks_pass = false;
					}

				} else if (page_directive_task.type() === "PageDirectiveValidate") {
					if (!this.processValidation(
							current_page,
							app_config,
							page_directive_task,
							inputs,
							errors)
				)
					{
						subtasks_pass = false;
					}
				}

			}
		}

		return subtasks_pass;

	}

	generateSoapSessionInfo(
		{
			current_page,
			page_directive_soap_call,
			app_config,
			inputs
		}
	) {
		let parameters_input = page_directive_soap_call.getInputParametersCopy(); /// Map objects
		let parameters_field = page_directive_soap_call.getFieldParametersCopy();

		let field_config = app_config.getFieldConfig(); // fieldconfig
		let fields = field_config.getFields(current_page); //shortdaoset

		String result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
		result += "<IAU TYPE=\"Utility\" VERSION=\"1.0\">\n";
		result += "<soapGeneration>";

		Iterator iter = parameters_input.keySet().iterator();
		while (iter.hasNext()) {

			String aKey = (String) iter.next();
			String fieldName = (String) parameters_input.get(aKey);

			String tmp = "";
			ShortDAO in = inputs.get(fieldName);
			if (in != null) {
				result += in.toXML();
			}
			//   tmp = in.getValue();

			//      result += "<input name=\"" + aKey + "\" value=\"" + tmp + "\"
			// displayValue=\"\" />\n";

		}

		iter = parameters_field.keySet().iterator();
		while (iter.hasNext()) {

			String aKey = (String) iter.next();
			String fieldName = (String) parameters_field.get(aKey);

			String tmp = "";
			ShortDAO in = fields.get(fieldName);
			if (in != null) {
				result += in.toXML();
			}

		}

		result += "</soapGeneration>\n";
		result += "</IAU>\n";

		return result;
	}

	private void importSoapReponseInfo(String currentPage, String xmlResponse,
			PageDirectiveSoapCall pdsc, AppConfig appCfg, ShortDAOSet inputs,
			ErrorDataSet errors) {

		HashMap imports_input = pdsc.getInputImportsCopy();
		HashMap imports_field = pdsc.getFieldImportsCopy();

		FieldConfig fcfg = appCfg.getFieldConfig();
		ShortDAOSet fields = fcfg.getFields(currentPage);

		if (xmlResponse != null) {
			InputSource xmlSource = new InputSource(new StringReader(
					xmlResponse));

			Document document;

			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();
			try {
				DocumentBuilder builder = factory.newDocumentBuilder();
				document = builder.parse(xmlSource);

				NodeList nl1 = document.getElementsByTagName("soapInput");
				for (int i = 0; i < nl1.getLength(); i++) {

					Node tmp = nl1.item(i);
					if ((tmp != null)
							&& (tmp.getNodeName().equals("soapInput"))) {
						//                      errors.add(new ErrorData("", "", "??" + i, "??" + i,
						// true));
						NamedNodeMap tmp2 = tmp.getAttributes();

						String name = "";
						String value = "";
						String displayValue = "";
						String description = "";
						String isViewable = "true";

						Node tmp3 = tmp2.getNamedItem("name");
						if (tmp3 != null) {
							name = tmp3.getNodeValue();
						}

						Node tmp4 = tmp2.getNamedItem("value");
						if (tmp4 != null) {
							value = tmp4.getNodeValue();
						}

						Node tmp5 = tmp2.getNamedItem("displayValue");
						if (tmp5 != null) {
							displayValue = tmp5.getNodeValue();
						}

						Node tmp6 = tmp2.getNamedItem("description");
						if (tmp6 != null) {
							description = tmp6.getNodeValue();
						}

						Node tmp7 = tmp2.getNamedItem("viewable");
						if (tmp7 != null) {
							isViewable = tmp6.getNodeValue();
						}

						//                      errors.add(new ErrorData("", "", "name: " + name,
						// "value: " + value, true));

						String inputName = (String) imports_input.get(name);
						if (inputName != null) {
							//                      errors.add(new ErrorData("", "", "Input name: " +
							// inputName, "value: " + value, true));
							//inputs.add( new Input(inputName, value, "", true)
							// );

							ShortDAO inputObject = new ShortDAO(new Info(
									"input", inputName, value, displayValue,
									description, isViewable));
							NodeList children0 = tmp.getChildNodes();
							if (children0 != null)
								inputObject.setChildren(children0);

							inputs.add(inputObject);
						}

						String fieldName = (String) imports_field.get(name);
						if (inputName != null) {
							//                      errors.add(new ErrorData("", "", "Input name: " +
							// inputName, "value: " + value, true));
							//inputs.add( new Input(inputName, value, "", true)
							// );

							ShortDAO current = fields.get(name);
							if (current != null) {
								displayValue = current.getDisplayValue();
								description = current.getDescription();
								isViewable = current.getViewSetting();
	``						}

							ShortDAO fieldObject = new ShortDAO(new Info(
									"field", inputName, value, displayValue,
									description, isViewable));
							NodeList children0 = tmp.getChildNodes();
							if (children0 != null)
								fieldObject.setChildren(children0);

							fcfg.importField(fieldObject);
							//fields.add( fieldObject );
						}

					}
				}

			} catch (SAXParseException spe) {
				errors.add(new ErrorData("", "", "Parse Exception", spe
						.getMessage(), true));
				// Error generated by the parser
				System.out.println("\n** Parsing error" + ", line "
						+ spe.getLineNumber() + ", uri " + spe.getSystemId());
				System.out.println("   " + spe.getMessage());

				// Use the contained exception, if any
				Exception x = spe;
				if (spe.getException() != null)
					x = spe.getException();
				x.printStackTrace();

			} catch (SAXException sxe) {

				// Error generated during parsing
				Exception x = sxe;
				if (sxe.getException() != null)
					x = sxe.getException();
				x.printStackTrace();

			} catch (ParserConfigurationException pce) {
				// Parser with specified options can't be built
				pce.printStackTrace();

			} catch (IOException ioe) {
				// I/O error
				ioe.printStackTrace();
			}
		}

	}

	private boolean processSoapCall(String currentPage, AppConfig appCfg,
			PageDirectiveSoapCall pdsc, ShortDAOSet inputs, ErrorDataSet errors)
			throws Exception {
		boolean result = true;
		String host = pdsc.getHost();
		String rmiServer = pdsc.getRMIServer();
		String rmiMethod = pdsc.getRMIMethod();

		SoapCall scInfo = appCfg.getSoapCallsConfig().getSoapCall(pdsc.getID());

		String sName = "";
		String sURL = "";
		String sSoapAction = "";
		String sContentType = "";
		String sRequestXSLT = "";
		String sResponseXSLT = "";

		if (scInfo != null) {
			sName = scInfo.getID();
			sURL = scInfo.getURL();
			sContentType = scInfo.getContentType();
			sSoapAction = scInfo.getSoapAction();
			sRequestXSLT = scInfo.getRequestXSLTFileName();
			sResponseXSLT = scInfo.getResponseXSLTFileName();

		}

		String sessionInfo = generateSoapSessionInfo(currentPage, pdsc, appCfg,
				inputs);

		XSLTTransform xt = new XSLTTransform(sessionInfo, sRequestXSLT);
		String requestMessage = xt.transform();

		HashMap parameters2 = new HashMap();

		parameters2.put("URL", sURL);
		parameters2.put("SoapAction", sSoapAction);
		parameters2.put("Body", requestMessage);
		parameters2.put("ContentType", sContentType);

		HashMap output = new HashMap();
		try {
			output = RMIClient.hashMapClient(host, rmiServer, rmiMethod,
					parameters2, sessionToken);
		}

		catch (java.rmi.NotBoundException e) {
			errors.add(new ErrorData("", "", "Error locating remote object", e
					.getMessage(), true));
		} catch (java.lang.NoSuchMethodException e) {
			errors.add(new ErrorData("", "", "Error locating remote method", e
					.getMessage(), true));
		} catch (java.lang.IllegalAccessException e) {
			errors.add(new ErrorData("", "", "Error accessing remote method", e
					.getMessage(), true));
		} catch (java.net.MalformedURLException e) {
			errors.add(new ErrorData("", "",
					"Invalid path specified for remote object", e.getMessage(),
					true));
		} catch (java.lang.reflect.InvocationTargetException e) {
			Exception targetE = (Exception) e.getTargetException();
			errors.add(new ErrorData("", "", "Error invoking remote method",
					targetE.getMessage(), true));
		} catch (Exception e) {

			errors.add(new ErrorData("", "",
					"General error running remote method: ", e.getMessage(),
					true));
		}

		String sSoapResponse;

		if (output == null) {
			sSoapResponse = "";
		} else {
			sSoapResponse = (String) output.get("Response");
		}

		if ((sSoapResponse == null) || sSoapResponse.equals("")) {
			errors.add(new ErrorData("", "", "Could not reach Soap Target",
					"Could not reach Soap Target", true));
		}

		xt = new XSLTTransform(sSoapResponse, sResponseXSLT);
		String sSessionResponse = xt.transform();

		importSoapReponseInfo(currentPage, sSessionResponse, pdsc, appCfg,
				inputs, errors);

		return result;

	}

	private ShortDAO getInputFromObject(String type, String name, Object obj) {

		ShortDAO anInput = new ShortDAO(new Info("", "", "", "", "", "false"));
		if (obj != null) {
			if (obj.getClass().getName().equals("java.lang.String")) {

				String value = (String) obj;
				anInput = new ShortDAO(new Info(type, name, value, "", "",
						"true"));
			} else {
				ShortDAO input = (ShortDAO) obj;
				if (input.isValidType()) {
					anInput = new ShortDAO(new Info(type, name, input
							.getValue(), input.getDisplayValue(), input
							.getDescription(), input.getViewSetting()));
					anInput.setChildren(input.getChildren().deepCopy());
				}

			}
		}

		return anInput;
	}

	private boolean processAction(String currentPage, AppConfig appCfg,
			PageDirectiveAction pda, ShortDAOSet inputs, ErrorDataSet errors) {
		boolean result = true;
		String host = pda.getHost();
		String rmiServer = pda.getRMIServer();
		String rmiMethod = pda.getRMIMethod();
		HashMap parameters_input = pda.getInputParametersCopy();
		HashMap imports_input = pda.getInputImportsCopy();
		HashMap parameters_field = pda.getFieldParametersCopy();
		HashMap imports_field = pda.getFieldImportsCopy();
		HashMap parameters = new HashMap();
		HashMap imports = new HashMap();

		FieldConfig fcfg = appCfg.getFieldConfig();
		ShortDAOSet fields = fcfg.getFields(currentPage);

		// Have to match up the FieldValues in the parameter with real Input
		// values
		String fieldName = "";

		Iterator iter = parameters_input.keySet().iterator();
		while (iter.hasNext()) {
			String aKey = (String) iter.next();
			fieldName = (String) parameters_input.get(aKey);

			ShortDAO in = inputs.get(fieldName);
			parameters_input.put(aKey, in);
		}

		iter = parameters_field.keySet().iterator();
		while (iter.hasNext()) {
			String aKey = (String) iter.next();
			fieldName = (String) parameters_field.get(aKey);

			ShortDAO in = fields.get(fieldName);
			parameters.put(aKey, in);
		}

		// merge the inputs into parameters. Note that input parameters override
		// field parameters of the same name!
		//
		iter = parameters_input.keySet().iterator();
		while (iter.hasNext()) {
			String aKey = (String) iter.next();
			ShortDAO in = (ShortDAO) parameters_input.get(aKey);
			parameters.put(aKey, in);
		}

		HashMap output = new HashMap();
		try {
			output = RMIClient.hashMapClient(host, rmiServer, rmiMethod,
					parameters, sessionToken);
		}

		catch (java.rmi.NotBoundException e) {
			errors.add(new ErrorData("", "", "Error locating remote object", e
					.getMessage(), true));
		} catch (java.lang.NoSuchMethodException e) {
			errors.add(new ErrorData("", "", "Error locating remote method", e
					.getMessage(), true));
		} catch (java.lang.IllegalAccessException e) {
			errors.add(new ErrorData("", "", "Error accessing remote method", e
					.getMessage(), true));
		} catch (java.net.MalformedURLException e) {
			errors.add(new ErrorData("", "",
					"Invalid path specified for remote object", e.getMessage(),
					true));
		} catch (java.lang.reflect.InvocationTargetException e) {
			errors.add(new ErrorData("", "", "Error invoking remote method", e
					.getMessage(), true));
		} catch (Exception e) {

			errors.add(new ErrorData("", "",
					"General error running remote method: ", e.getMessage(),
					true));
		}

		if (output == null) {
			iter = imports_field.keySet().iterator();
			while (iter.hasNext()) {

				String aKey = (String) iter.next();
				ShortDAO anInput = new ShortDAO(new Info("field", aKey, "", "",
						"", "true"));

				if (anInput.isValidType())
					fcfg.importField(anInput);
			}

			iter = imports_input.keySet().iterator();
			while (iter.hasNext()) {

				String aKey = (String) iter.next();
				ShortDAO anInput = new ShortDAO(new Info("input", aKey, "", "",
						"", "true"));
				if (anInput.isValidType())
					inputs.add(anInput);
			}

		} else {
			iter = imports_field.keySet().iterator();
			while (iter.hasNext()) {

				String aKey = (String) iter.next();
				String outputFieldName = (String) imports_field.get(aKey);
				Object obj = output.get(outputFieldName);
				ShortDAO anInput;

				if (obj == null) {
					anInput = new ShortDAO(new Info("field", aKey, "", "", "",
							"true"));
				} else {
					anInput = getInputFromObject("field", aKey, obj);
				}

				ShortDAO current = fields.get(aKey);
				if (current != null) {
					anInput.setDisplayValue(current.getDisplayValue());
					anInput.setDescription(current.getDescription());
					anInput.setViewSetting(current.getViewSetting());
				}

				if (anInput.isValidType())
					//    fields.add( anInput );
					fcfg.importField(anInput);
			}

			iter = imports_input.keySet().iterator();
			while (iter.hasNext()) {

				String aKey = (String) iter.next();
				String outputFieldName = (String) imports_input.get(aKey);
				Object obj = output.get(outputFieldName);
				ShortDAO anInput;

				if (obj == null) {
					anInput = new ShortDAO(new Info("input", aKey, "", "", "",
							"true"));
				} else {
					anInput = getInputFromObject("input", aKey, obj);
				}
				if (anInput.isValidType())
					inputs.add(anInput);
			}

		}

		return result;

	}

	private boolean processLocalAction(String currentPage, AppConfig appCfg,
			PageDirectiveLocalAction pda, ShortDAOSet inputs,
			ErrorDataSet errors) {
		boolean result = true;
		String className = pda.getClassName();
		String methodName = pda.getMethodName();
		HashMap parameters_input = pda.getInputParametersCopy();
		HashMap imports_input = pda.getInputImportsCopy();
		HashMap parameters_field = pda.getFieldParametersCopy();
		HashMap imports_field = pda.getFieldImportsCopy();
		HashMap parameters = new HashMap();
		HashMap imports = new HashMap();

		FieldConfig fcfg = appCfg.getFieldConfig();
		ShortDAOSet fields = fcfg.getFields(currentPage);

		// Have to match up the FieldValues in the parameter with real Input
		// values
		String fieldName = "";

		Iterator iter = parameters_input.keySet().iterator();
		while (iter.hasNext()) {
			String aKey = (String) iter.next();
			fieldName = (String) parameters_input.get(aKey);

			ShortDAO in = inputs.get(fieldName);
			parameters_input.put(aKey, in);
		}

		iter = parameters_field.keySet().iterator();
		while (iter.hasNext()) {
			String aKey = (String) iter.next();
			fieldName = (String) parameters_field.get(aKey);

			ShortDAO in = fields.get(fieldName);
			parameters.put(aKey, in);
		}

		// merge the inputs into parameters. Note that input parameters override
		// field parameters of the same name!
		//
		iter = parameters_input.keySet().iterator();
		while (iter.hasNext()) {
			String aKey = (String) iter.next();
			ShortDAO in = (ShortDAO) parameters_input.get(aKey);
			parameters.put(aKey, in);
		}

		HashMap output = new HashMap();
		try {
			output = LocalPluginClient.hashMapClient(className, methodName,
					parameters, sessionToken);
		}

		catch (java.lang.IllegalAccessException e) {
			errors.add(new ErrorData("", "",
					"Error: Illegal Access Exception accessing local class", e
							.getMessage(), true));
		} catch (java.lang.reflect.InvocationTargetException e) {
			errors.add(new ErrorData("", "", "Error invoking local method: "
					+ e.toString() + "; " + e.getMessage(), e.getMessage(),
					true));
		} catch (Exception e) {

			errors.add(new ErrorData("", "",
					"General error running remote method: ", e.getMessage(),
					true));
		}

		if (output == null) {
			iter = imports_field.keySet().iterator();
			while (iter.hasNext()) {

				String aKey = (String) iter.next();
				ShortDAO anInput = new ShortDAO(new Info("field", aKey, "", "",
						"", "true"));

				if (anInput.isValidType())
					fcfg.importField(anInput);
			}

			iter = imports_input.keySet().iterator();
			while (iter.hasNext()) {

				String aKey = (String) iter.next();
				ShortDAO anInput = new ShortDAO(new Info("input", aKey, "", "",
						"", "true"));
				if (anInput.isValidType())
					inputs.add(anInput);
			}

		} else {

			iter = imports_field.keySet().iterator();
			while (iter.hasNext()) {

				String aKey = (String) iter.next();
				String outputFieldName = (String) imports_field.get(aKey);
				Object obj = output.get(outputFieldName);
				ShortDAO anInput;

				if (obj == null) {
					anInput = new ShortDAO(new Info("field", aKey, "", "", "",
							"true"));
				} else {
					anInput = getInputFromObject("field", aKey, obj);
				}

				ShortDAO current = fields.get(aKey);

				if (current != null) {
					anInput.setDisplayValue(current.getDisplayValue());
					anInput.setDescription(current.getDescription());
					anInput.setViewSetting(current.getViewSetting());
				}

				if (anInput.isValidType())
					//fields.add( anInput );
					fcfg.importField(anInput);
			}

			iter = imports_input.keySet().iterator();
			while (iter.hasNext()) {

				String aKey = (String) iter.next();
				String outputFieldName = (String) imports_input.get(aKey);
				Object obj = output.get(outputFieldName);
				ShortDAO anInput;

				if (obj == null) {
					anInput = new ShortDAO(new Info("input", aKey, "", "", "",
							"true"));
				} else {
					anInput = getInputFromObject("input", aKey, obj);
				}
				if (anInput.isValidType())
					inputs.add(anInput);
			}
		}

		return result;

	}

	private boolean processValidationAction(String currentPage,
			AppConfig appCfg, PageDirectiveValidateAction pdv,
			ShortDAOSet inputs, ErrorDataSet errors) {
		boolean result = false;
		String host = pdv.getHost();
		String rmiServer = pdv.getRMIServer();
		String rmiMethod = pdv.getRMIMethod();
		String displayValue = pdv.getDisplayValue();
		String errorFieldName = pdv.getErrorFieldName();

		HashMap parameters_input = pdv.getInputParametersCopy();
		HashMap parameters_field = pdv.getFieldParametersCopy();
		HashMap parameters = new HashMap();

		FieldConfig fcfg = appCfg.getFieldConfig();
		ShortDAOSet fields = fcfg.getFields(currentPage);

		// Have to match up the FieldValues in the parameter with real Input
		// values
		String fieldName = "";

		Iterator iter = parameters_input.keySet().iterator();
		while (iter.hasNext()) {
			String aKey = (String) iter.next();
			fieldName = (String) parameters_input.get(aKey);
			if (errorFieldName == null || errorFieldName.equals("")) {
				errorFieldName = fieldName;
			}

			ShortDAO in = inputs.get(fieldName);
			parameters_input.put(aKey, in);
		}

		iter = parameters_field.keySet().iterator();
		while (iter.hasNext()) {
			String aKey = (String) iter.next();
			fieldName = (String) parameters_field.get(aKey);
			if (errorFieldName == null || errorFieldName.equals("")) {
				errorFieldName = fieldName;
			}

			ShortDAO in = fields.get(fieldName);
			parameters.put(aKey, in);
		}

		// merge the inputs into parameters. Note that input parameters override
		// field parameters of the same name!
		//
		iter = parameters_input.keySet().iterator();
		while (iter.hasNext()) {
			String aKey = (String) iter.next();
			ShortDAO in = (ShortDAO) parameters_input.get(aKey);
			parameters.put(aKey, in);
		}

		Boolean bResult = new Boolean(result);
		try {
			bResult = RMIClient.booleanClient(host, rmiServer, rmiMethod,
					parameters, sessionToken);
		}

		catch (java.rmi.NotBoundException e) {
			errors.add(new ErrorData("", "", "Error locating remote object", e
					.getMessage(), true));
		} catch (java.lang.NoSuchMethodException e) {
			errors.add(new ErrorData("", "", "Error locating remote method", e
					.getMessage(), true));
		} catch (java.lang.IllegalAccessException e) {
			errors.add(new ErrorData("", "", "Error accessing remote method", e
					.getMessage(), true));
		} catch (java.net.MalformedURLException e) {
			errors.add(new ErrorData("", "",
					"Invalid path specified for remote object", e.getMessage(),
					true));
		} catch (java.lang.reflect.InvocationTargetException e) {
			errors.add(new ErrorData("", "", "Error invoking remote method", e
					.getMessage(), true));
		} catch (Exception e) {

			errors.add(new ErrorData("", "",
					"General error running remote method: ", e.getMessage(),
					true));
		}

		if (bResult != null) {
			result = bResult.booleanValue();

			if (!result) {
				if (!errorFieldName.equals("")) {
					fieldName = errorFieldName;
				}

				errors.add(new ErrorData(fieldName, fieldName, displayValue,
						displayValue, true));

			}
		}

		return result;

	}

	private boolean processValidation(String currentPage, AppConfig appCfg,
			PageDirectiveValidate pdv, ShortDAOSet inputs, ErrorDataSet errors) {
		boolean result = true;
		String errorCode = pdv.getErrorCode();
		String fieldName = pdv.getFieldName();
		String errorFieldName = pdv.getErrorFieldName();
		String displayValue = pdv.getDisplayValue();

		if (errorFieldName == null || errorFieldName.equals("")) {
			errorFieldName = fieldName;
		}

		ValidationsInfo vi = appCfg.getValidationsConfig().getValidation(
				currentPage, errorCode);
		if (vi != null) {
			ShortDAO in = inputs.get(fieldName);
			if ((in == null) && (!vi.validateString(""))) // validate against
														  // the rule with an
														  // empty string if the
														  // input does not
														  // exist.
			{
				result = false;
				errors.add(new ErrorData(errorFieldName, errorFieldName,
						displayValue, displayValue, true));

			}
			if ((in != null) && (!vi.validateString(in.getValue()))) {
				result = false;
				errors.add(new ErrorData(errorFieldName, errorFieldName,
						displayValue, displayValue, true));

			}
		}
		return result;

	}

	/**
	 * Add Feb 14 by Gang Wu
	 * 
	 * @param currentPage
	 * @param appCfg
	 * @param inputs
	 * @param errors
	 * @throws Exception
	 */
	public void invokeInitActions(String currentPage, AppConfig appCfg,
			ShortDAOSet inputs, ErrorDataSet errors) throws Exception {

		if (pf == null) {
			return;
		}
		PageDirectiveSet pds = pf.get(currentPage);

		if (pds != null) {
			
			PageDirective initActions = pds.getInitActions();
			if ( initActions != null )
				processPageDirective(currentPage, appCfg, initActions, inputs, errors);
			
		} 
		
	}

	public String toString() {
		String tmp = "";
		if (pf == null) {
			tmp += "PageFlows are null\n";
		} else {
			tmp += "PageFlows\n" + pf.toString();
		}
		tmp += "\n";
		return tmp;
	}

}