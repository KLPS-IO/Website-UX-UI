<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* ./subviews/logincomponents/token.twig */
class __TwigTemplate_94489e0062104028ad9dbfd159a91a5b extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'formheading' => [$this, 'block_formheading'],
            'description' => [$this, 'block_description'],
            'formcontent' => [$this, 'block_formcontent'],
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "./subviews/logincomponents/captcha.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $this->parent = $this->loadTemplate("./subviews/logincomponents/captcha.twig", "./subviews/logincomponents/token.twig", 1);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_formheading($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 4
        yield "        ";
        yield gT("Please enter your access code to participate in this survey.");
        yield "
    ";
        return; yield '';
    }

    // line 7
    public function block_description($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 8
        yield "        <div class=\"col-lg-12\">
            <p class='";
        // line 9
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 9), "maincoldivdivbp", [], "any", false, false, true, 9), 9, $this->source);
        yield " alert alert-info' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 9), "maincoldivdivbp", [], "any", false, false, true, 9), 9, $this->source);
        yield ">
                ";
        // line 10
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aForm", [], "any", false, false, true, 10), "token", [], "any", false, false, true, 10) == null)) {
            // line 11
            yield "                    ";
            yield gT("If you have been issued an access code, please enter it in the box below and click continue.");
            yield "
                ";
        } else {
            // line 13
            yield "                    ";
            yield gT("Please confirm the access code by answering the security question below and click continue.");
            yield "
                ";
        }
        // line 15
        yield "            </p>
        </div>
    ";
        return; yield '';
    }

    // line 20
    public function block_formcontent($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 21
        yield "        <div class=\"col-lg-12\">
            <div class='";
        // line 22
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 22), "maincolform", [], "any", false, false, true, 22), 22, $this->source);
        yield "' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 22), "maincolform", [], "any", false, false, true, 22), 22, $this->source);
        yield ">
                <label class='";
        // line 23
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 23), "maincolformlabel", [], "any", false, false, true, 23), 23, $this->source);
        yield " control-label' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 23), "maincolformlabel", [], "any", false, false, true, 23), 23, $this->source);
        yield ">
                    ";
        // line 24
        yield gT("Access code");
        yield "<small class=\"";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 24), "maincolformlabelsmall", [], "any", false, false, true, 24), 24, $this->source);
        yield " asterisk ri-asterisk small \" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 24), "maincolformlabelsmall", [], "any", false, false, true, 24), 24, $this->source);
        yield " ></small>
                    <span class=\"";
        // line 25
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 25), "maincolformlabelspan", [], "any", false, false, true, 25), 25, $this->source);
        yield " visually-hidden asterisk \" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 25), "maincolformlabelspan", [], "any", false, false, true, 25), 25, $this->source);
        yield ">
                    ( ";
        // line 26
        yield gT("Mandatory");
        yield " )
                    </span>
                </label>

                <div class='";
        // line 30
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 30), "maincolformdiva", [], "any", false, false, true, 30), 30, $this->source);
        yield "' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 30), "maincolformdiva", [], "any", false, false, true, 30), 30, $this->source);
        yield ">
                    ";
        // line 31
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aForm", [], "any", false, false, true, 31), "token", [], "any", false, false, true, 31) == null)) {
            // line 32
            yield "                        <div class='input-group ls-important-field'>
                            <input
                                class='";
            // line 34
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 34), "maincolformdivainput", [], "any", false, false, true, 34), 34, $this->source);
            yield " form-control' 
                                ";
            // line 35
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 35), "maincolformdivainput", [], "any", false, false, true, 35), 35, $this->source);
            yield "
                                placeholder=\"";
            // line 36
            yield gT("Enter access code");
            yield "\"
                            >
                            <button type=\"button\"  class=\"input-group-text ls-no-js-hidden\" id=\"ls-toggle-token-show\" data-passwordstate=\"hidden\">
                                <i class=\"fa fa-eye ls-password-hidden\" aria-hidden=\"true\"></i><span class=\"visually-hidden ls-password-hidden\">gT(\"Show code\")</span>
                                <i class=\"fa fa-eye-slash d-none ls-password-shown\" aria-hidden=\"true\"></i><span class=\"visually-hidden d-none ls-password-shown\">gT(\"Hide code\")</span>
                            </button>
                        </div>
                        <script>
                            \$(\"#ls-toggle-token-show\").on('click', function () {
                                if (\$(this).data('passwordstate') == \"hidden\") {
                                    \$(this).prev(\"input\").attr('type', 'text');
                                    \$(this).find('.ls-password-hidden').addClass('d-none');
                                    \$(this).find('.ls-password-shown').removeClass('d-none');
                                    \$(this).data('passwordstate', 'shown');
                                } else {
                                    \$(this).prev(\"input\").attr('type', 'password');
                                    \$(this).find('.ls-password-hidden').removeClass('d-none');
                                    \$(this).find('.ls-password-shown').addClass('d-none');
                                    \$(this).data('passwordstate', 'hidden');
                                }
                            });
                        </script>
                    ";
        } else {
            // line 59
            yield "                        ";
            // line 60
            yield "                        ";
            $context["passwordFieldHtmlOptions"] = ["id" => "token", "required" => true, "readonly" => true, "class" => "form-control ls-important-field"];
            // line 66
            yield "
                        ";
            // line 67
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["C"] ?? null), "Html", [], "any", false, false, true, 67), "passwordField", ["token", CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,             // line 69
($context["aSurveyInfo"] ?? null), "aForm", [], "any", false, false, true, 69), "token", [], "any", false, false, true, 69),             // line 70
($context["passwordFieldHtmlOptions"] ?? null)], "method", false, false, true, 67), 67, $this->source);
            // line 71
            yield "
                    ";
        }
        // line 73
        yield "                </div>
            </div>

            ";
        // line 77
        yield "            ";
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aForm", [], "any", false, false, true, 77), "bCaptchaEnabled", [], "any", false, false, true, 77) == true)) {
            // line 78
            yield "                <div class=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 78), "maincolformdivb", [], "any", false, false, true, 78), 78, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 78), "maincolformdivb", [], "any", false, false, true, 78), 78, $this->source);
            yield ">
                    <label class='";
            // line 79
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 79), "maincolformdivblabel", [], "any", false, false, true, 79), 79, $this->source);
            yield " control-label' ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 79), "maincolformdivblabel", [], "any", false, false, true, 79), 79, $this->source);
            yield " >
                        ";
            // line 80
            yield gT("Please solve the following equation:");
            yield "<small class=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 80), "maincolformdivblabelsmall", [], "any", false, false, true, 80), 80, $this->source);
            yield " superset asterisk ri-asterisk\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 80), "maincolformdivblabelsmall", [], "any", false, false, true, 80), 80, $this->source);
            yield " >&nbsp;</small>
                        <span class=\"";
            // line 81
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 81), "maincolformdivblabelspan", [], "any", false, false, true, 81), 81, $this->source);
            yield " visually-hidden asterisk\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 81), "maincolformdivblabelspan", [], "any", false, false, true, 81), 81, $this->source);
            yield ">
                        ( ";
            // line 82
            yield gT("Mandatory");
            yield " )
                        </span>
                    </label>
                    <div class=\"row\">
                        <div class=\"captcha-container col-xl-3 col-lg-12 align-items-center\">
                            ";
            // line 87
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, LS_Twig_Extension::renderCaptcha(), "renderOut", [], "method", false, false, true, 87), 87, $this->source);
            yield "
                            <a href=\"#\" class=\"btn btn-outline-secondary\" id=\"reloadCaptcha\"
                               title=\"";
            // line 89
            yield gT("Reload captcha");
            yield "\" data-toggle=\"captcha\"><i
                                        class=\"ri-refresh-line\"></i></a>
                        </div>
                        <div class=\"";
            // line 92
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 92), "maincolformdivbdiv", [], "any", false, false, true, 92), 92, $this->source);
            yield " col-xl-9 col-lg-12 captcha-input align-self-center\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 92), "maincolformdivbdiv", [], "any", false, false, true, 92), 92, $this->source);
            yield ">
                            <input class='form-control ls-important-field ";
            // line 93
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 93), "maincolformdivbdivdivinput", [], "any", false, false, true, 93), 93, $this->source);
            yield "' ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 93), "maincolformdivbdivdivinput", [], "any", false, false, true, 93), 93, $this->source);
            yield " placeholder=\"";
            yield gT("Enter result here - numbers only");
            yield "\">
                        </div>
                    </div>
                </div>
            ";
        }
        // line 98
        yield "
            ";
        // line 99
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aForm", [], "any", false, false, true, 99), "hiddenFields", [], "any", false, false, true, 99), 99, $this->source);
        yield "

            <div class='";
        // line 101
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 101), "maincolformdivc", [], "any", false, false, true, 101), 101, $this->source);
        yield " ' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 101), "maincolformdivc", [], "any", false, false, true, 101), 101, $this->source);
        yield ">
                <div
                        class='";
        // line 103
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 103), "maincolformdivcdiv", [], "any", false, false, true, 103), 103, $this->source);
        yield "' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 103), "maincolformdivcdiv", [], "any", false, false, true, 103), 103, $this->source);
        yield ">
                    <button type=\"submit\"
                            class='";
        // line 105
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 105), "maincolformdivcdivbutton", [], "any", false, false, true, 105), 105, $this->source);
        yield " btn btn-primary' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 105), "maincolformdivcdivbutton", [], "any", false, false, true, 105), 105, $this->source);
        yield ">
                        ";
        // line 106
        yield gT("Continue");
        yield "
                    </button>
                </div>
            </div>
        </div>
    ";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/logincomponents/token.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  299 => 106,  293 => 105,  286 => 103,  279 => 101,  274 => 99,  271 => 98,  259 => 93,  253 => 92,  247 => 89,  242 => 87,  234 => 82,  228 => 81,  220 => 80,  214 => 79,  207 => 78,  204 => 77,  199 => 73,  195 => 71,  193 => 70,  192 => 69,  191 => 67,  188 => 66,  185 => 60,  183 => 59,  157 => 36,  153 => 35,  149 => 34,  145 => 32,  143 => 31,  137 => 30,  130 => 26,  124 => 25,  116 => 24,  110 => 23,  104 => 22,  101 => 21,  97 => 20,  90 => 15,  84 => 13,  78 => 11,  76 => 10,  70 => 9,  67 => 8,  63 => 7,  55 => 4,  51 => 3,  40 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/logincomponents/token.twig", "/Users/emmamendez/Source/KLPS/Website-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/logincomponents/token.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 10, "set" => 60);
        static $filters = array();
        static $functions = array("gT" => 4, "renderCaptcha" => 87);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
                [],
                ['gT', 'renderCaptcha'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
